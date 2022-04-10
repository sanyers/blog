const promise1 = Promise.resolve('promise1');

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2 延迟1秒');
  }, 1000);
});

// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('promise3 延迟2秒');
//   }, 2000);
// });

const promise4 = Promise.reject('reject promise4');

// const promise5 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('reject promise5');
//   }, 3000);
// });

// Promise.all([promise1, promise2, promise3])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

Promise.myAll = function(promises = []) {
  let n = 0;
  const r = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(res => {
          r.push(res);
          n++;
          if (n === promises.length) {
            resolve(r);
          }
        })
        .catch(reject);
    }
  });
};

// Promise.myAll([promise1, promise2, promise3, promise4, promise5])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

Promise.myRace = function(promises = []) {
  return new Promise((resolve, reject) => {
    promises.forEach(item =>
      Promise.resolve(item)
        .then(resolve)
        .catch(reject),
    );
  });
};

// Promise.myRace([promise5, promise4])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

Promise.myAny = function(promises = []) {
  let errors = 0;
  return new Promise((resolve, reject) => {
    promises.forEach(item => {
      Promise.resolve(item)
        .then(resolve)
        .catch(err => {
          errors++;
          if (errors === promises.length) {
            reject(new Error('promise error'));
          }
        });
    });
  });
};

// Promise.myAny([promise4, promise1, promise2])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

Promise.myAllSettled = function(promises = []) {
  const arr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then(res => {
          arr[index] = res;
          count++;
        })
        .catch(err => {
          arr[index] = err;
          count++;
        })
        .finally(() => {
          if (count === promises.length) {
            resolve(arr);
          }
        });
    });
  });
};

Promise.myAllSettled([promise4, promise1, promise2])
  .then(res => console.log(res))
  .catch(err => console.log(err));
