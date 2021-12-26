function test(timer) {
  return {
    hour: Math.floor(timer / 60),
    minute: timer - Math.floor(timer / 60) * 60,
    second:timer
  };
}

let a = test(119);
console.log(a);
