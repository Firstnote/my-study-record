// 抽线类

export {}; // 确保跟其它示例没有成员冲突

abstract class Animal {
  //只能继承，不能实例化
  eat(food: string): void {
    console.log(`呼噜呼噜的吃: ${food}`);
  }

  abstract run(distance: number): void; //子类中必须实现抽象方法
}

class Dog extends Animal {
  run(distance: number): void {
    console.log("四脚爬行", distance);
  }
}

const d = new Dog();
d.eat("嗯西马");
d.run(100);
