# Part3 Vue.js 框架源码与进阶

## 模块二 Vue.js 源码分析（响应式、虚拟 DOM、模板编译和组件化）

### 一、简答题

#### 1、请简述 Vue 首次渲染的过程。

A:

- 初始化 Vue 的静态成员、实例成员
- new Vue() 实例化 Vue 的构造函数
- 在 Vue 的构造函数中调用\_init()
- 调用 vm.\$mount()
  - 没有传入 render 时，对模板进行编译生成一个 render 函数
  - 有传入 render 时，就跳过上一步的编译过程
  - 调用 mountComponent 方法
- 在 mountComponent 定义了 updateComponent 方法
  - 调用 vm.\_render(), 实现将真实 Dom 转换成虚拟 Dom Vnode，并作为下一步的一个参数
  - 调用 vm.\_update(vm.\_render()),将上一步的 vm.\_render()获取到的 Vnode 作为新节点 ，和老节点进行一个 diff 比较，将比较结果记录到 vm.\$el 中
- 创建渲染 watcher ，并且把 updateComponent 作为参数
  - 在 Watcher 的内部调用其内部的方法 get 时，执行 updateComponent() 然后进行视图的更新
- 首次渲染结束

#### 2、请简述 Vue 响应式原理。

A:

Vue 内部在初始化的时候会遍历 data 中的每一个属性，使用 Object.defineProperty() 对每一个属性进行 getter/setter 数据劫持。在首次渲染中，\$mount 进行实例挂载的时候，调用 render 函数 ，会触发调用属性的 get 方法，创建 Dep 对象，调用 depend 方法,进行依赖收集，将有引用该属性的 Watcher 对象添加到 Dep 对象中的 subs 订阅者集合中去。当某个属性的属性值发生变化时，会触发该属性的 set 方法，在 set 内部又调用了 dep 的 notice 方法，对这个属性的订阅者集合进行遍历，调用每一个 Watcher 进行视图的异步更新

#### 3、请简述虚拟 DOM 中 Key 的作用和好处。

A:

作用：对 Vnode 节点进行唯一性标识

好处：在数据发生变化后，视图对应的地方也要发生变化，这时候会使用 diff 算法来遍历比较新老 Vnode 的差异。不使用 key 的情况下，只要满足标签相同即可对子节点进行更新，这样做增加了 Dom 的操作。然而，使用 key 的话，必须要满足 key 和 标签都相同的情况下才进行更新子节点，能够最大限度的重用老节点的 Dom 结构，减少了 Dom 操作

#### 4、请简述 Vue 中模板编译的过程。

> 前置条件：<br>
> 在编译和运行时版本的 vue 下<br>
> 实例化 Vue(options), options 中没有手写 render 函数

编译过程：

- 调用 baseCompile(template)
- 调用 pasre 方法，将 template 转换成 ast 抽象语法树
- 调用 optimize， 对 ast 进行优化，标志出 ast 中的静态子树，在重新渲染的时候，不需要重新生成节点，在 patch 中直接跳过对比
- 调用 generate，将 ast 生成对应的 JS 创建代码
- 将上一步生成的 JS 代码，通过 createFunction 方法，生成一个匿名函数
- 将 render、staticRenderFns 对应的匿名函数，挂载到 vue 实例上的 options 对应的 render 和 staticRenderFns 属性上
