let a = [1, 2, 3, 4];
a.length = a.length - 1;

console.log(a);

const b = ["foo", "bar", "baz", "qux"];

console.log(b.keys());
for (const [idx, element] of b.entries()) {
  console.log(idx, element);
}


const a2 = ['foo', 'bar', 'baz', 'qux'];
console.log(a2.toLocaleString());
console.log(a2.toString());
console.log(a2.valueOf());
console.log(a2.join('|'));