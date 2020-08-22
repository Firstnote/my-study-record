// app.js
//使用 fp.add(x,y)和 fp.map(f,x)创建一个能让 functor 里的值增加的函数 ex1
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let maybe = Maybe.of([5, 6, 1]);
let ex1 = () => {
  // 你需要实现的函数。。。
  return maybe.map((x) => fp.map(fp.add(1), x));
};
console.log(ex1());
