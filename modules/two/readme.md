# 模块一：函数式编程与 JS 异步编程、手写 Promise

## 简答题

### 一、请说出下列最终得执行结果，并解释为什么。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();
```

A:执行结果： 10

> 结果分析：由于 var 声明的变量，没有块级作用域，可在全局使用，执行 a[6]()时，循环体已执行完，每循环一次 i 的值都会被改变，且最终 i 的值为 10，所以执行 a[i<10]()时都为 10

### 二、请说出下列最终得执行结果，并解释为什么。

```javascript
var tmp = 123;
if (tmp) {
  console.log(tmp);
  let tmp;
}
```

A:执行结果： 报错

> 结果分析：let 声明会形成暂时性死区，在当前函数体作用域下，tmp 属于在 let 声明前调用，所以会报错

### 三、结合 ES6 中的新语法，用最简单的方式找出最小值

```javascript
var arr = [12, 34, 32, 89, 3];
```

A:

```javascript
var min = arr.reduce((x, y) => (x < y ? x : y));
```

### 四、请详细说明 var，let, const 三种声明变量的方式之间的具体差别。

A:

> - var 如果声明在函数里为局部变量，声明在函数外则为全局变量。
> - var 存在变量提升，变量可以在声明之前使用， 值为 undefined。
> - var 可以重复声明。

> - let 声明的变量只在声明所在的代码块中有效。
> - let 声明的变量不能再声明之前使用，否则报错。
> - let 不可以重复声明。

> const 的作用是声明常量，一旦初始化便不能改变。如果声明的是对象，那指针不会变，但对象的属性可以改变。其他与 let 一致。

### 五、请说出下列代码最终输出的结果，并解释为什么。

```js
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a);
    });
  },
};
obj.fn();
```

A:执行结果：20

> 结果分析：箭头函数内部没有 this 的概念，不改变 this 的指向，此时的 this 指向调用 fn 的 obj，所以结果是 20

### 六、简述 Symbol 类型的用途。

A:

> Symbol 是 js 原始数据类型之一，可获取独一无二的值，主要用于生成对象私有属性不被外部访问。该属性不可被 Object.keys()和 JSON.stringify()等常规方法遍历，可通过 Object.getOwnPropertySymbols()和 Reflect.ownKeys()访问。

### 七、说说什么是浅拷贝，什么是深拷贝

A:

> 深浅拷贝是对于引用数据来说的，浅拷贝指的是指针的拷贝，实现数据共享，拷贝后指针指向同一片内存地址，深拷贝指具体内容的拷贝，拷贝之后会占用不同的内存地址

### 八、请简述 TypeScript 与 JavaScript 之间的关系。

A:

> - TypeScript 是 JavaScript 的超集，并对 JavaScript 进行了扩展
> - TypeScript 在 JavaScript 的基础上增加了数据类型检测。
> - TypeScript 运行前需要编译成 JavaScript。

### 九、请谈谈你所认为的 TypeScript 优缺点。

A:
优点：

> - 静态代码检测，在代码编写时避免错误而不是运行时
> - 降低大型工程的维护和迭代成本
> - 优秀的社区环境
>   缺点：
> - 一门新语言需要学习成本
> - 需要编译

### 十、描述引用计数的工作原理和优缺点。

A:

> 工作原理：其核心思想是设置引用数，判断当前引用数是否为 0；其实现方式是通过设置引用计数器，并根据引用关系变化时修改引用数字，当引用数字为 0 时，GC 就会立即工作，将当前对象的空间进行回收。

> - 优点：随时进行垃圾回收，不会造成程序的卡顿。
> - 缺点：无法处理循环引用的情况，时间开销较大。

### 十一、描述标记整理算法的工作流程。

A:

> 分为三个阶段，标记、清除、整理。在标记阶段，collector 从 mutator 根对象开始进行遍历，对从 mutator 根对象可以访问到的对象都打上一个标识，一般是在对象的 header 中，将其记录为可达对象。而在清除阶段，collector 对堆内存(heap memory)从头到尾进行线性的遍历，如果发现某个对象没有标记为可达对象-通过读取对象的 header 信息，则将对象的地址进行移动，使其在地址上连续，然后再回收。

### 十二、描述 V8 新生代存储区垃圾回收的流程

A:

> - 回收过程采用复制算法 + 标记整理
> - 新生代内存区分为两个等大小空间
> - 使用空间为 From，空间空间为 To
> - 活动对象存储于 From 空间，当 From 空间使用到一定程度后便会触发 GC 操作
> - 对 From 空间进行活动对象的标记，并进行整理
> - 将整理后的活动对象拷贝至 To
> - 对 From 空间进行回收操作
> - From 与 To 交换空间完成释放

> 拷贝过程中可能会出现晋升，晋升就是将新生代对象移至老生代。一轮 GC 还存活的新生代需要晋升，To 空间的使用率超过 25%

### 十三、描述增量标记算法在何时使用及工作原理

A:

> 增量标记算法：它是在 V8 清除老生代对象时为提高清除效率优化时使用的，因为在进行垃圾回收的操作时会阻塞程序的执行，所以在老生代中会在程序执行的空档期去执行回收操作，此时就可以使用增量标记算法。它是将当前一整段的垃圾回收操作，分成多个小步组合去完成，实现垃圾回收和程序执行交替完成，可以让时间消耗更合理，达到效率优化的好处。

> 工作原理：JS 程序执行过程中，会伴随着垃圾回收的工作。当垃圾回收工作时，需要遍历对象进行标记，此时不需要将所有对象进行标记，可以先将直接可达的对象进行标记，标记完成后暂停标记。然后让 JS 程序执行一会，再让 GC 机制去做二步标记，将间接可达的对象进行标记，标记完成后暂停标记。重复以上两不操作，让程序执行和垃圾回收的标记操作交替执行，来达到优化效率和提升用户体验的目的。