function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
  this.add = val => {
    let current = this;
    while (current.next) {
      current = current.next;
    }
    current.next = new ListNode(val);
    return this;
  };
  this.values = () => {
    let current = this;
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
}

// 两数相加
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const current = new ListNode(0);
  let temp = current;
  while (l1 || l2) {
    const v1 = l1 ? l1.val || 0 : 0;
    const v2 = l2 ? l2.val || 0 : 0;
    const vals = v1 + v2;
    if (vals >= 10) {
      temp.val += vals - 10;
      temp.next = new ListNode(1);
    } else {
      temp.val += vals;
      if (temp.val === 10) {
        temp.val = 0;
        temp.next = new ListNode(1);
      } else {
        if ((l1 && l1.next) || (l2 && l2.next)) {
          temp.next = new ListNode(0);
        }
      }
    }
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
    temp = temp.next;
  }
  return current;
};

// const l1 = [2, 4, 3],
//   l2 = [5, 6, 4];

// const l1 = [0],
//   l2 = [0];

// const l1 = [9, 9, 9, 9, 9, 9, 9],
//   l2 = [9, 9, 9, 9];

const l1 = new ListNode(2);
l1.add(4).add(3);
const l2 = new ListNode(5);
l2.add(6).add(4);

// const l1 = new ListNode(0);
// const l2 = new ListNode(0);

// const l1 = new ListNode(9);
// l1.add(9).add(9).add(9).add(9).add(9).add(9);
// const l2 = new ListNode(9);
// l2.add(9).add(9).add(9);

console.log(addTwoNumbers(l1, l2).values());
