const navConfig = require('./navConfig');
const filterItem = require('./filterItem');
const fs = require('fs');
const util = require('util');

const isGitee = JSON.parse(process.env.npm_config_argv).cooked.includes('--gitee');

function getSidebar() {
    const groupList = getGroup('group');
    const groupxList = getGroup('groupx');
    return {...groupList, ...groupxList };
}

function getGroup(name) {
    const filterList = navConfig.filter(item => item.type === name);
    const list = {};
    filterList.forEach(element => {
        element.items.forEach(item => {
            if (name === 'group') {
                getItems(list, item);
            } else {
                item.items.forEach(ele => {
                    getItems(list, ele);
                });
            }
        });
    });
    return list;
}

function getItems(list, item) {
    const newList = {};
    const filesList = [
        [item.link, item.firstName]
    ];
    let files = fs.readdirSync('./docs' + item.link);
    const isSort = files[0].includes('-');
    if (isSort) {
        files.splice(files.indexOf('README.md'), 1);
        files.sort((a, b) => {
            const n = a.split('-')[0];
            const m = b.split('-')[0];
            return n && m ? (isMax(n, m) ? -1 : 1) : (!n ? 1 : -1);
        });
        files.unshift('README.md');
    }
    files.forEach(index => {
        const isSearch = index.search('.md') > 0;
        if (isSearch) {
            const splitStr = index.split('.md');
            if (splitStr[0] !== 'README' && !getFilterItem(splitStr[0])) {
                filesList.push([item.link + splitStr[0], splitStr[0]]);
            }
        }
    });
    newList[item.link] = filesList;
    Object.assign(list, newList);
}

function isMax(a, b) {
    if (isLess(a, b)) {
        return true;
    } else if (isEqual(a, b)) {
        const c = isUndefined(a.split('.')[1]);
        const d = isUndefined(b.split('.')[1]);
        return isLess(c, d);
    } else {
        return false;
    }
}

// 判定是否小于
function isLess(a, b) {
    return parseInt(a) < parseInt(b);
}

// 判定是否等于
function isEqual(a, b) {
    return parseInt(a) === parseInt(b);
}

function isUndefined(val) {
    return val === undefined ? '0' : val;
}

function getFilterItem(name) {
    return isGitee ? filterItem.includes(name) : false;
}

module.exports = { getSidebar };