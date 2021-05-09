/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:27:19
 * @LastEditors: theajack
 * @LastEditTime: 2021-05-09 17:41:24
 * @FilePath: \electron-vue\src\renderer\lib\message.js
 * @Description: Coding something
 */

import {ipcRenderer} from 'electron';
import {MSG} from '../../constant';

let msgId = 0;

const ReplyMap = (() => {
    const map = {};
    return {
        add (id, fn) {
            map[id] = fn;
        },
        reply (replyData) {
            const id = replyData.msgId;
            if (!map[id]) {
                return;
            }

            checkResultSuccess(replyData);

            map[id](replyData.data);
            delete map[id];
        }
    };
})();

function checkResultSuccess (result) {
    if (!result.success) {
        console.error(result.errorMsg, result);
        return false;
    }
    return true;
}

export function initOnAsyncMessageReply () {
    ipcRenderer.on(MSG.ASYNC_REPLY, (event, replyData) => {
        ReplyMap.reply(replyData);
    });
}

export function postMessageSync (type, data = {}) {
    const result = ipcRenderer.sendSync(MSG.SYNC, {
        msgType: type,
        data
    });

    checkResultSuccess(result);

    return result.data;
}

export function postMessage (type, data, callback) {
    if (typeof data === 'function') {
        callback = data;
    }
    const id = ++msgId;

    const postData = {
        msgId: id,
        msgType: type,
        data
    };

    let result = null;

    if (callback) {
        ReplyMap.add(id, callback);
        result = null;
    } else {
        result = new Promise((resolve) => {
            ReplyMap.add(id, resolve);
        });
    }
    ipcRenderer.send(MSG.ASYNC, postData);

    return result;
}
