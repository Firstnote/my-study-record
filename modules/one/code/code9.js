// 使用 Maybe 重写 ex4，不要有 if 语句
// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n);
//   }
// };

let ex4 = (n) => Maybe.of(n).map(parseInt);
console.log(ex4(2.4));
