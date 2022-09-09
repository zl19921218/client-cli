/*
 * @Author: 小石头
 * @Date: 2022-08-31 14:57:15
 * @LastEditors: 小石头
 * @LastEditTime: 2022-09-07 20:02:58
 * @Description: 
 */
'use strict';

module.exports = cli;

const pkg = require('../package.json');

const utilLog = require("@shitou-client-cli/log");

// 支持  .js / .json / .node

// .js -> module.exports
// json -> JSON.parse
// 其他文件 -> 使用js引擎解析

function cli() {
    checkPkgVersion();
    console.log('欢迎使用小石头牌脚手架');
    utilLog();
}

function checkPkgVersion() {
    console.log('pkgVersion: ', pkg.version);
}
