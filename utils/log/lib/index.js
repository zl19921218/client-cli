/*
 * @Author: 小石头
 * @Date: 2022-09-07 17:47:33
 * @LastEditors: 小石头
 * @LastEditTime: 2022-09-16 14:54:14
 * @Description: 
 */
'use strict';

const npmlog = require('npmlog');

npmlog.addLevel('success', 2000, {fg: 'green', bold: true})

npmlog.level = process.env.LOG_LEVEL || 'info';

npmlog.heading = "小石头牌脚手架";

module.exports = npmlog;

