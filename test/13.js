const a = {
  title: "test",
  desc: "hello",
};

const b = {
  desc: "world",
  person: {
    name: "xiaoming",
    age: 19,
  },
};

Object.assign(a, b);
console.log(a);
a.person.age = 20;
console.log(b);
