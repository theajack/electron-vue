/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:27:19
 * @LastEditors: tackchen
 * @LastEditTime: 2021-05-06 17:28:05
 * @FilePath: \electron-vue\src\renderer\lib\message.js
 * @Description: Coding something
 */

import { ipcRenderer } from 'electron';

export function msg1 () {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"
}

export function msg2 () {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg); // prints "pong"
    });
    ipcRenderer.send('asynchronous-message', 'ping');
}
