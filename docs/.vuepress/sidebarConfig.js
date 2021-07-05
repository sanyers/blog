const navConfig = require('./navConfig');
const fs = require('fs');
const util = require('util');

function getSidebar () {
    const groupList = navConfig.filter(item => item.type === 'group');
    const navList = navConfig.filter(item => item.isList);
    const list = getGroupName(groupList);
    navList.forEach(element => {
        const files = fs.readdirSync('./docs' + element.link);
        const filesList = [];
        files.forEach(element => {
            const splitStr = element.split('.');
            if (splitStr[1] === 'md' && splitStr[0] !== 'README') {
                filesList.push(splitStr[0]);
            }
        });
        list[element.link] = ['', ...filesList];
    });
    return list;
}

function getGroupName (groupList) {
    const list = {};
    groupList.forEach(element => {
        element.items.forEach(item => {
            const newItem = getGroupList(item.text);
            Object.assign(list, newItem);
        });
    });
    return list;
}

function getGroupList (groupName) {
    const url = './docs/' + groupName;
    const dir = fs.readdirSync(url);
    const list = {};
    dir.forEach(element => {
        const filesList = [['/' + groupName + '/' + element + '/', '开始']];
        const files = fs.readdirSync(url + '/' + element);
        files.forEach(item => {
            const splitStr = item.split('.');
            if (splitStr[1] === 'md' && splitStr[0] !== 'README') {
                filesList.push(['/' + groupName + '/' + element + '/' + splitStr[0], splitStr[0]]);
            }
        });

        list['/' + groupName + '/' + element] = filesList;
    });
    return list;
}

module.exports = { getSidebar };