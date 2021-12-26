const book = {
  year: 2017,
  name: "ES2017",
};
Object.defineProperty(book, "year", {
  get() {
    return this._year || void 0; // 定义一个新的属性否则会出现栈溢出（Uncaught RangeError: Maximum call stack size exceeded）
  },
  set(newValue) {
    if (newValue > 2017) {
      this._year = newValue;
      this.name = "ES" + newValue;
    } else {
      this.name = "No year";
    }
  },
});

book.year = 2015;
console.log(book.year, book.name);

const books = {};
Object.defineProperties(books, {
  _year: {
    value: 2017,
  },
  name: {
    value: "ES2017",
  },
  year: {
    get() {
      return this._year;
    },
    set(newValue) {
      if (newValue >= 2017) {
        this._year = newValue;
        this.name = "ES" + newValue;
      } else {
        this.name = "No year";
      }
    },
  },
});

console.log(books.year, books.name);
