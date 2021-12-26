for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}

const list = [1, 2, 3, 4, 5, 6, 7, 8];

try {
  list.forEach((element) => {
    if (element === 5) {
      throw new Error("ending");
    }
    console.log(element);
  });
} catch (e) {}
