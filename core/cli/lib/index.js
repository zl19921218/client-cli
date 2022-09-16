/*
 * @Author: 小石头
 * @Date: 2022-08-31 14:57:15
 * @LastEditors: 小石头
 * @LastEditTime: 2022-09-16 15:44:42
 * @Description:
 */
"use strict";

module.exports = cli;

const path = require("path");

const semver = require("semver");
const utilLog = require("@shitou-client-cli/log");
const colors = require("colors/safe");
const userHome = require("user-home");
const pathExists = require("path-exists");
const dotEnv = require("dotenv");

const args = require("minimist")(process.argv.slice(2));

const pkg = require("../package.json");
const constants = require("./constants");

// 支持  .js / .json / .node

// .js -> module.exports
// json -> JSON.parse
// 其他文件 -> 使用js引擎解析

function cli() {
    try {
        checkPkgVersion();
        checkNodeVersion();
        checkRoot();
        checkUserHome();
        checkInputArgs();
        checkDebug();
        checkEnv();
        checkGlobalUpdate();
    } catch (e) {
        utilLog.error(e.message);
    }
}

/**
 * @Author: 小石头
 * @description: 检测脚手架更新
 */
function checkGlobalUpdate() {

}

/**
 * @Author: 小石头
 * @description: 检查环境变量
 */
function checkEnv() {
    const dotEnvPath = path.resolve(userHome, '.env');

    if (pathExists.sync(dotEnvPath)) {
        dotEnv.config({path: dotEnvPath});
    }

    createDefaultConfig();

    utilLog.verbose("env", process.env.CLI_HOME_PATH);
}

/**
 * @Author: 小石头
 * @description: 创建默认的环境变量
 */
function createDefaultConfig() {

    let cliHome;

    if (process.env.CLI_HOME) {
        cliHome = path.join(userHome, process.env.CLI_HOME);
    } else {
        cliHome = path.join(userHome, constants.DEFAULT_CLI_HOME);
    }

    process.env.CLI_HOME_PATH = cliHome;
}

/**
 * @Author: 小石头
 * @description: 检查入参
 */
function checkInputArgs() {
    // console.log("args: ", args.debug);
}

function checkDebug() {
    if (args.debug) {
        // process.env.LOG_LEVEL = "verbose";
        utilLog.level = "verbose";
    }
}

/**
 * @Author: 小石头
 * @description: 检测用户主目录
 */
function checkUserHome() {
    if (!userHome || !pathExists.sync(userHome)) {
        throw new Error(colors.reset("用户主目录异常"));
    }
}

/**
 * @Author: 小石头
 * @description: 检查root账户
 */
function checkRoot() {
    (async () => {
        const rootCheck = await import("root-check");
        rootCheck.default();
    })();
}

/**
 * @Author: 小石头
 * @description: 检查项目版本
 */
function checkPkgVersion() {
    utilLog.notice("项目版本: ", pkg.version);
}

/**
 * @Author: 小石头
 * @description: 检查node版本
 */
function checkNodeVersion() {
    const currentVersion = process.version;
    const lowestNodeVersion = constants.LOWEST_NODE_VERSION;

    if (!semver.gt(currentVersion, lowestNodeVersion)) {
        throw new Error(
            `小石头牌脚手架需要安装 v${lowestNodeVersion} 以上的Node版本`
        );
    }
}
