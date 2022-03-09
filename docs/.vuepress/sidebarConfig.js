const navConfig = require('./navConfig');
const fs = require('fs');
const util = require('util');

function getSidebar () {
  const groupList = getGroup('group');
  const groupxList = getGroup('groupx');
  return { ...groupList, ...groupxList };
}

function getGroup (name) {
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

function getItems (list, item) {
  const newList = {};
  const filesList = [[item.link, item.firstName]];
  let files = fs.readdirSync('./docs' + item.link);
  const isSort = files[0].includes('-');
  if (isSort) {
    files.sort((a, b) => {
      const n = parseFloat(a.split('-')[0]);
      const m = parseFloat(b.split('-')[0]);
      return n && m ? (n < m ? -1 : 1) : (!n ? 1 : -1);
    });
  }
  files.forEach(index => {
    const isSearch = index.search('.md') > 0;
    if (isSearch) {
      const splitStr = index.split('.md');
      if (splitStr[0] !== 'README') {
        filesList.push([item.link + splitStr[0], splitStr[0]]);
      }
    }
  });
  newList[item.link] = filesList;
  Object.assign(list, newList);
}

module.exports = { getSidebar };
