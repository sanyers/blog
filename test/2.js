// 引用类型操作示例

const now1 = new Date();
const now2 = now1;
now1.setDate(1);
console.log(now2);

let s1 = new String("some text");
let s2 = s1;
s1.name = 'xiaoming';
console.log(s2);

let n1 = new Number("1234");
let n2 = n1;
n1.name = 'xiaoli';
console.log(n2);

let b1 = new Boolean(true);
let b2 = b1;
b1.name = 'xiaozhang';
console.log(b2);