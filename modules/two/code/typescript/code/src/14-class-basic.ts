// 类（Class）

export {}; // 确保跟其它示例没有成员冲突

class Person {
  // 属性必须要有初始值，可直接赋值或者初始化时指定
  name: string; // = 'init name'
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHi(msg: string): void {
    console.log(`I am ${this.name}, ${msg}`);
  }
}
