/*
 * @Author: tackchen
 * @Date: 2021-05-06 16:53:47
 * @LastEditors: tackchen
 * @LastEditTime: 2021-05-06 17:33:19
 * @FilePath: \electron-vue\src\main\lib\message.js
 * @Description: 与渲染进程通信
 */

import {ipcMain} from 'electron';

export function initMessage () {
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg); // prints "ping"
        event.sender.send('asynchronous-reply', 'pong');
    });

    ipcMain.on('synchronous-message', (event, arg) => {
        console.log(arg); // prints "ping"
        event.returnValue = 'pong';
    });
}
