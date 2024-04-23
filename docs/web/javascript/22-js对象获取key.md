# js 对象获取 key

## 1、Object.keys()

遍历自身可以枚举属性

```js
const obj1 = {
  a: 1,
  b: 2,
};

Object.keys(obj1);
```

## 2、Object.values() /Object.entries()

返回自身可枚举属性的键值对数组

```js
const obj1 = {
  a: 1,
  b: 2,
};

Object.values(obj1);
Object.entries(obj1);
```

## 3、for-in

遍历可枚举属性

```js
const obj1 = {
  a: 1,
  b: 2,
};

for (let key in yourColors) {
  console.log(key);
}
```

## 4、hasOwnProperty

遍历可枚举属性，返回一个布尔值，只能判断自有属性是否存在，对于继承属性会返回 false

```js
const obj1 = {
  a: 1,
  b: 2,
};

obj1.hasOwnProperty('a');
```

## 5、getOwnPropertyNames()

返回可枚举属性和不可枚举属性，不包括 prototype 属性，不包括 symbol 类型的 key

```js
const obj1 = {
  a: 1,
  b: 2,
};

console.log(Object.getOwnPropertyNames(obj1));
```

## 6、getOwnPropertySymbols()

返回 symbol 类型的 key 属性

```js
Object.getOwnPropertySymbols(obj);
```
