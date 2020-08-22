// setTimeout(function () {
//   var a = "hello";
//   setTimeout(function () {
//     var b = "money";
//     setTimeout(function () {
//       var c = "I ❤️ you";
//       console.log(a + b + c);
//     }, 10);
//   }, 10);
// }, 10);
function promise(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(payload);
    }, 1000);
  });
}

promise("hello ")
  .then((res) => promise(res + "money "))
  .then((res) => promise(res + "I ❤️ you"))
  .then((res) => {
    console.log(res);
  });

new Promise((resolve) => {
  resolve("hello ");
})
  .then((res) => res + "money ")
  .then((res) => res + "I ❤️ you")
  .then((res) => {
    console.log(res);
  });
