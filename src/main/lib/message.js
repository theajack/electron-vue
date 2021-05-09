/*
 * @Author: tackchen
 * @Date: 2021-05-06 16:53:47
 * @LastEditors: theajack
 * @LastEditTime: 2021-05-09 17:36:51
 * @FilePath: \electron-vue\src\main\lib\message.js
 * @Description: 与渲染进程通信
 */

import {ipcMain} from 'electron';
import {MSG, MSG_TYPE} from '../../constant';

const handlerMap = {
    [MSG_TYPE.TEST_SYNC_MSG]: (data) => {
        return {data, reply: 'SyncMessage'};
    },
    [MSG_TYPE.TEST_ASYNC_MSG]: (data, callback) => {
        setTimeout(() => {
            callback({
                data,
                reply: 'AsyncMessage'
            });
        }, 1000);
    }
};

function handleMessage (data, callback) {
    const type = data.msgType;

    const handler = handlerMap[type];

    let success = true;
    let errorMsg = '';
    let returnData = null;

    if (typeof handler !== 'function') {
        success = false;
        errorMsg = `不存在的消息${type}`;
    } else {
        try {
            returnData = handler(data.data, callback);
        } catch (err) {
            success = false;
            errorMsg = err;
        }
    }

    return {
        errorMsg,
        success,
        msgId: data.msgId,
        msgType: type,
        data: returnData
    };
}

export function initMainOnMessage () {
    ipcMain.on(MSG.ASYNC, (event, data) => {
        handleMessage(data, (replyData, errorMsg = '') => {
            event.sender.send(MSG.ASYNC_REPLY, {
                success: errorMsg === '',
                errorMsg,
                msgId: data.msgId,
                type: data.msgType,
                data: replyData
            });
        });
    });

    ipcMain.on(MSG.SYNC, (event, data) => {
        event.returnValue = handleMessage(data);
    });
}
