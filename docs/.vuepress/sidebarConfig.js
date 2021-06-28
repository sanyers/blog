const navConfig = require('./navConfig');
const fs = require('fs');
const util = require('util');

function getSidebar () {
    const navList = navConfig.filter(item => item.isList);
    const list = { ...getLineYear('2021') };
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

function arrList () {
    return {
        '/2021/5': [
            ['/2021/5/', 'sad'],
            ['/2021/5/aa', 'aa'],
        ],
        '/2021/6': [
            ['/2021/6/', 'sdfe'],
            ['/2021/6/bb', 'bb'],
        ],
    }
}

function getLineYear (year) {
    const url = './docs/' + year;
    const dir = fs.readdirSync(url);
    const list = {};
    dir.forEach(element => {
        const filesList = [['/' + year + '/' + element + '/', 'README']];
        const files = fs.readdirSync(url + '/' + element);
        files.forEach(item => {
            const splitStr = item.split('.');
            if (splitStr[1] === 'md' && splitStr[0] !== 'README') {
                filesList.push(['/' + year + '/' + element + '/' + splitStr[0], splitStr[0]]);
            }
        });

        list['/' + year + '/' + element] = filesList;
    });
    return list;
}

module.exports = { getSidebar };