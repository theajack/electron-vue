/*
 * @Author: tackchen
 * @Date: 2021-05-06 17:44:12
 * @LastEditors: tackchen
 * @LastEditTime: 2021-05-07 10:43:37
 * @FilePath: \electron-vue\src\renderer\lib\util.js
 * @Description: Coding something
 */
import XLSX from 'xlsx';

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
