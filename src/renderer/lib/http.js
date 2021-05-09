/*
 * @Autor: theajack
 * @Date: 2021-05-09 18:00:08
 * @LastEditors: theajack
 * @LastEditTime: 2021-05-09 18:00:29
 * @Description: Coding something
 */
import https from 'https';

export function http () {
    const request = https.request('https://www.baidu.com');
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        response.on('end', () => {
            console.log('No more data in response.');
        });
    });
    request.end();
}
