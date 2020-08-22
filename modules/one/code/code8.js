// 实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母

// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x]);
});
let user = { id: 2, name: "Albert" };
let ex3 = (user) => {
  // 你需要实现的函数。。。
  return fp.flowRight(fp.map(fp.first), safeProp("name"))(user);
};
console.log(ex3(user));
