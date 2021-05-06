/*
 * @Author: tackchen
 * @Date: 2021-05-06 16:53:47
 * @LastEditors: tackchen
 * @LastEditTime: 2021-05-06 16:57:10
 * @FilePath: \electron-demo\electron-vue\src\main\lib\message.js
 * @Description: 与渲染进程通信
 */

import {ipcMain} from 'electron';

ipcMain.handle('open-excel', (event, ...args) => {
    console.log(event, ...args);
});
