const obj = [1, 2];
console.log(Object.entries(obj));

const frozen = Object.freeze({ x: 2, y: 5, z: { a: 1, b: 4} });
frozen.x = 3;
frozen.z.a = 'aa';
console.log(frozen);
