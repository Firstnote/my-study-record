# Part3 Vue.js 框架源码与进阶

## 模块一 手写 Vue Router、手写响应式实现、虚拟 DOM 和 Diff 算法

### 一、简答题

#### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

A: vue 响应式对象的新增成员不是响应式数据，对象在 vue 初始化的时候被 vue 劫持才成了响应式数据，但是新增的属性无法在初始化后被劫持，需要主动调用 vue 的原型方法 set 对新增属性劫持

#### 2、请简述 Diff 算法的执行过程

A: diff 算法针对以下 5 种情形处理新老节点

- 老开始节点和新开始节点比较，相同的话新老开始节点坐标向后移动一位后循环
- 老结束节点和新结束节点比较，相同的话新老结束节点坐标向前移动一位后循环
- 老开始节点和新结束节点比较，相同的话老开始节点向后移动一位同时新结束节点向前移动一位后循环
- 新开始节点和老结束节点比较，相同的话新开始节点向后移动一位同时老结束节点向前移动一位后循环
- 如果以上都没有都话，在老节点 key 值组成都数组中查找新开始节点的 key，如果存在则处理新开始节点并新开始节点坐标向后移动一位；如果没有则新增该节点

### 二、编程题

#### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

A:[vueRouter](./code/vue-router-basic-usage/src/router/vueRouter.js)

#### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

A:[minivue](./code/minivue/js/compiler.js)

#### 3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：

![](./Ciqc1F7zUZ-AWP5NAAN0Z_t_hDY449.png)

A:[snabbdom-demo](./code/snabbdom-demo)
