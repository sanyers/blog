# js 链表

## 1、链表简介

链表是什么？链表是一种动态的数据结构，这意味着我们可以任意增删元素，它会按需扩容。为何要使用链表？下面列举一些链表的用途：

- 因为数组的存储有缺陷：增删元素时往往需要移动元素。而链表在内存中的放置并不是连续的，元素通过 next 属性指向下个元素，所以链表增删元素，不需要移动元素，只需要更改 next 的指向即可。
- 在生活中，最形象的链表莫过于火车了，车头是 head，每一节车厢都有一个 next 用于连接后面的车厢，想增删车厢，只需要更改 next 即可。
- 在使用分离链接法解决散列表冲突时，我们也会用链表存储位置冲突的元素。
- 在 JavaScript 这门语言中有两个非常重要的链：作用域链和原型链。学习链表对于理解 JavaScript 的这两个特性也非常有帮助。

## 2、实现链表

```js
function ListNode(val, next) {
  const Node = function (val, next) {
    this.val = val || 0;
    this.next = next || null;
  };
  this.count = 0;
  this.nodeObj = null;
  if (val) {
    this.nodeObj = new Node(val, next);
    this.count++;
  }

  const _self = this;
  // 从队尾加入
  this.push = function (val) {
    if (!_self.count) {
      this.nodeObj = new Node(val, next);
    } else {
      let current = _self.nodeObj;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(val);
    }
    this.count++;
    return _self;
  };

  // 从队头加入
  this.unshift = function (val) {
    if (!_self.count) {
      this.nodeObj = new Node(val, next);
    } else {
      let current = _self.nodeObj;
      _self.nodeObj = new Node(val, current);
    }
    this.count++;
    return _self;
  };

  // 从队尾删除最后一项
  this.pop = function () {
    if (_self.count) {
      let current = _self.nodeObj;
      while (current.next) {
        if (!current.next.next) {
          break;
        }
        current = current.next;
      }
      current.next = null;
      this.count--;
    }
    return _self;
  };

  // 从队头删除第一项
  this.shift = function () {
    if (_self.count) {
      let current = _self.nodeObj;
      _self.nodeObj = current.next;
      this.count--;
    }
    return _self;
  };

  // 插入
  this.insert = function (index, val) {
    const { current, next } = _self.getIndexItems(index);
    current.next = new Node(val, next);
    _self.count++;
    return _self;
  };

  // 替换
  this.replace = function (index, val) {
    const { current } = _self.getIndexItems(index);
    current.val = val;
    return _self;
  };

  // 删除
  this.delete = function (index) {
    const { prev, current, next } = _self.getIndexItems(index);
    if (current) {
      if (!prev) {
        _self.shift();
      } else if (!next) {
        _self.pop();
      } else {
        prev.next = next;
        _self.count--;
      }
    }
    return _self;
  };

  // 根据索引找到当前队、当前队的前一个、当前队的后一个
  this.getIndexItems = function (index) {
    const obj = {
      prev: null,
      current: null,
      next: null,
    };
    if (_self.count) {
      let num = 0;
      let prev = null;
      let current = _self.nodeObj;
      while (current.next) {
        if (num === index) {
          break;
        }
        prev = current;
        current = current.next;
        num++;
      }
      obj.current = num === index ? current : null;
      obj.prev = obj.current ? prev : null;
      obj.next = current.next;
    }
    return obj;
  };

  // 根据索引找到当前值
  this.getIndexValue = function (index) {
    const { current } = _self.getIndexItems(index);
    return current.val;
  };

  // 查找值返回索引，未找到返回 -1
  this.indexOf = function (val) {
    let current = _self.nodeObj;
    let index = 0;
    while (current) {
      if (val === current.val) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };

  this.includes = function (val) {
    let current = _self.nodeObj;
    while (current) {
      if (val === current.val) {
        return true;
      }
      current = current.next;
    }
    return false;
  };

  // 返回所有 values
  this.values = function () {
    let current = _self.nodeObj;
    const values = [];
    if (current) {
      values.push(current.val);
      while (current.next) {
        current = current.next;
        values.push(current.val);
      }
    }
    return values;
  };

  this.toString = function () {
    return _self.values().toString();
  };
  this.join = function (s) {
    return _self.values().join(s);
  };
}

// 使用方法
const test = new ListNode(1);
test.push(2).push(3);
console.log(test.toString()); // 1,2,3
```

## 3、参考

https://www.liuyiqi.cn/2017/02/15/linked-list/