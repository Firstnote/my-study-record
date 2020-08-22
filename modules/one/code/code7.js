// 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = () => {
  // 你需要实现的函数。。。
  return fp.first(xs._value);
};
console.log(ex2());
