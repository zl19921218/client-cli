/*
 * @Author: 小石头
 * @Date: 2022-09-07 17:47:33
 * @LastEditors: 小石头
 * @LastEditTime: 2022-09-07 20:06:27
 * @Description: 
 */
'use strict';

const npmlog = require('npmlog');

module.exports = log;

function log() {
    // return "Hello from log";
    npmlog.info('cli', 'test');
}
