let person = {
  name: "xiaoming",
};
Object.defineProperty(person, "name", {
  configurable: false,
});

console.log(person.name);
// person.name = "xxx";
delete person.name;
console.log(person.name);

console.log(Object.getOwnPropertyDescriptor(person, "name"));

let test = {};
Object.defineProperty(test, "name", {
  value: "xiaoli",
});
test.name = "23424";
console.log(Object.getOwnPropertyDescriptor(test, "name"));
