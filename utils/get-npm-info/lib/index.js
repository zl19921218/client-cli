/*
 * @Author: 小石头
 * @Date: 2022-09-16 15:59:26
 * @LastEditors: 小石头
 * @LastEditTime: 2022-09-17 14:33:14
 * @Description: 
 */
'use strict';

const axios = require("axios");
const urlJoin = require("url-join");
const semver = require("semver");


async function getNpmSemverVersion(npmName, registry, baseVersion) {
    const versions = await getOriginVersion(npmName, registry);
    const semverVersions = getSemverVersions(baseVersion, versions);

    if (semverVersions && semverVersions.length) {
        return semverVersions[0];
    }

    return null;
}

function getSemverVersions(baseVersion, versions) {
    return versions.filter(version => semver.satisfies(version, `^${baseVersion}`)).sort((a, b) => semver.gt(b, a));
}

/**
 * @Author: 小石头
 * @description: 获取库版本
 * @param {*} npmName
 * @param {*} registry
 * @return {*}
 */
async function getOriginVersion(npmName, registry) {

    const origin = getNpmInfo(npmName, registry);

    if (!origin) {
        return null;
    }

    const res = await axios.get(origin);

    if (res.status !== 200) {
        return null;
    }

     return Object.keys(res.data.versions);
}

/**
 * @Author: 小石头
 * @description: 获取库在源上的地址
 * @param {String} npmName
 * @param {URL} registry
 * @return {URL}
 */
function getNpmInfo(npmName, registry) {
    if (!npmName) {
        return null;
    }

    const origin = registry || getDefaultRegistry();

    return urlJoin(origin, npmName);
}

/**
 * @Author: 小石头
 * @description: 获取源
 * @return {URL}
 */
function getDefaultRegistry() {
    return 'https://registry.npmjs.org/';
}


module.exports = {
    getOriginVersion,
    getNpmSemverVersion
};