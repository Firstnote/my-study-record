# 模块一：函数式编程与 JS 异步编程、手写 Promise

## 简答题

### 一、谈谈你是如何理解 JS 异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？

A:

> js 本身的功能决定了 js 是单线程，异步编程的出现是为了提高单线程 js 执行的效率，针对一些耗时的操作不至于阻塞单线程的运行
> 主线程运行的时候，会产生堆和栈。栈中的代码会调用各种外部 API。他们在消息队列中加入各种事件。只要栈中的代码执行完毕，主线程就会去读取“消息队列”，依次执行哪些事件所对应的回调函数。主线程从“消息队列”中读取事件，这个过程是循环不断的。所以叫事件循环机制（Eventloop）。
> 宏任务是消息队列里的任务，常见的接口请求、定时器等异步任务都是宏任务。
> 微任务是基于当前任务产生而随当前任务结束后立即执行的任务，所以也是异步任务， 但是不需要通过 EventLoop 监测，通过消息队列取出并压入执行栈中再执行； 像通过 Promise、MutationObserver、process.nextTick 产生的任务都为微任务。

## 代码题

### 一、将下面异步代码使用 Promise 的方式改进

```javascript
setTimeout(function () {
  var a = "hello";
  setTimeout(function () {
    var b = "money";
    setTimeout(function () {
      var c = "I ❤️ you";
      console.log(a + b + c);
    }, 10);
  }, 10);
}, 10);
```

A:[code1](./code/code1.js)

### 二、基于以下代码完成下面的四个练习

```javascript
const fp = require("lodash/fp");
//数据
//horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: "Aston Martin One-77",
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 130000,
    in_stock: false,
  },
];
```

#### 练习 1:

使用函数组合 fp.flowRight()重新实现下面这个函数

```javascript
let isLastInStock = function (cars) {
  //获取最后一条数据
  let last_car = fp.last(cars);
  //获取最后一条数据的in_stock属性值
  return fp.prop("in_stock", last_car);
};
```

A:[code2](./code/code2.js)

#### 练习 2:

使用 fp.flowRight() fp.prop()和 fp.first()获取第一个 car 的 name

A:[code3](./code/code3.js)

#### 练习 3:

使用帮助函数\_average 重构 averageDollarValue,使用函数组合的方式实现

```javascript
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length;
}; // 无须改动
let averageDollarValue = function (cars) {
  let dollar_values = fp.map(function (car) {
    return car.dollar_value;
  }, cars);
  return _average(dollar_values);
};
```

A:[code4](./code/code4.js)

#### 练习 4:

使用 flowRight 写一个 sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的 name 转换成这种形式:
sanitizeNames(['Hello World'])=>['hello_world']

```javascript
let _underscore = fp.replace(/\w+/g, "_"); //无须改动，并在sanitizeNames中使用它
```

A:[code5](./code/code5.js)

### 三、基于下面提供的代码，完成后续的四个练习

```javascript
// support.js
class Container {
  static of(value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Container.of(fn(this._value));
  }
}
class Maybe {
  static of(x) {
    return new Maybe(x);
  }
  isNothing() {
    return this._value === null || this._value === undefined;
  }
  constructor(x) {
    this._value = x;
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value));
  }
}
module.exports = { Maybe, Container };
```

#### 练习 1:

使用 fp.add(x,y)和 fp.map(f,x)创建一个能让 functor 里的值增加的函数 ex1

```javascript
// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let maybe = Maybe.of([5, 6, 1]);
let ex1 = () => {
  // 你需要实现的函数。。。
};
```

A:[code6](./code/code6.js)

#### 练习 2:

实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素

```javascript
// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = () => {
  // 你需要实现的函数。。。
};
```

A:[code7](./code/code7.js)

#### 练习 3：

实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母

```javascript
// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x]);
});
let user = { id: 2, name: "Albert" };
let ex3 = () => {
  // 你需要实现的函数。。。
};
```

A:[code8](./code/code8.js)

#### 练习 4：

使用 Maybe 重写 ex4，不要有 if 语句

```javascript
// app.js
const fp = require("lodash/fp");
const { Maybe, Container } = require("./support");
let ex4 = function (n) {
  if (n) {
    return parseInt(n);
  }
};
```

A:[code9](./code/code9.js)

### 四、手写实现 MyPromise 源码

要求：尽可能还原 Promise 中的每一个 API，并通过注释的方式描述思路和原理。

A:[mypromise](./code/mypromise.js)
测试:[test](./code/test.js)
