function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function() {
  console.log(this.name);
};
let keys = Object.keys(Person.prototype);

console.log(keys);

let keys2 = Object.getOwnPropertyNames(Person.prototype); 
console.log(keys2);
