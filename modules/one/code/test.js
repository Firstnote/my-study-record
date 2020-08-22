const Mypromise = require("./mypromise");

new Mypromise((resolve) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
})
  .then((res) => {
    // 无返回值
    console.log(1, res);
  })
  .then((res) => {
    console.log(2, res);
    return res * 2;
  })
  .then((res) => {
    console.log(3, res);
  })
  .finally(() => {
    //finally
    console.log("finally");
  })
  .then((res) => {
    console.log("finally", res);
  })
  .then(
    //catch
    () =>
      new Mypromise((res, rej) => {
        rej(321);
      })
  )
  .catch((e) => {
    console.log(e);
  })
  .then(
    //静态方法resolve
    (res) => Mypromise.resolve(res * 2)
  )
  .then((res) => {
    console.log("resolve", res);
  })
  .then((res) => {
    //静态方法all
    return Mypromise.all([
      new Mypromise((resolve) => {
        setTimeout(() => {
          resolve("all1");
        }, 1000);
      }),
      new Mypromise((resolve) => {
        setTimeout(() => {
          resolve("all2");
        }, 1000);
      }),
    ]);
  })
  .then((res) => {
    console.log(res);
  });
