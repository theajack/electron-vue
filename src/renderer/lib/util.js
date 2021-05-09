/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:44:12
 * @LastEditors: theajack
 * @LastEditTime: 2021-05-09 17:33:25
 * @FilePath: \electron-vue\src\renderer\lib\util.js
 * @Description: Coding something
 */
import XLSX from 'xlsx';
import {networkInterfaces} from 'os';

export function handleExcelData (file, callback) {
    const reader = new FileReader();
    reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const header = getHeaderRow(worksheet);
        const results = XLSX.utils.sheet_to_json(worksheet);
        // this.batchUploadData.header = header;
        // this.batchUploadData.data = results;
        var res = {};
        res.header = header;
        res.results = results;
        callback(res);
    };
    reader.readAsArrayBuffer(file);
}

function getHeaderRow (sheet) {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C;
    const R = range.s.r;
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        let hdr = 'UNKNOWN ' + C;
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
    }
    return headers;
}

const zeroRegex = /(?:[0]{1,2}[:-]){5}[0]{1,2}/;

export function getMAC () {
    const list = networkInterfaces();
    // eslint-disable-next-line no-unused-vars
    for (const [key, parts] of Object.entries(list)) {
        if (!parts) continue;
        for (const part of parts) {
            if (zeroRegex.test(part.mac) === false) {
                return part.mac;
            }
        }
    }
    throw new Error('failed to get the MAC address');
}
