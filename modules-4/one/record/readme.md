# 模块一：React 设计原理解密及核心源码解读

## 简答题

### 一、请简述 React 16 版本中初始渲染的流程

A:
要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。

- render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作
- commit 阶段负责根据 Fiber 节点标记 ( effectTag ) 进行相应的 DOM 操作。

### 二、为什么 React 16 版本中 render 阶段放弃了使用递归

A:
React 16 之前的版本比对更新 VirtualDOM 的过程是采用循环加递归实现的，而 JavaScript 中函数递归是不可被打断的, 并且 JavaScript 是单线程，所以在 render 任务开始进行就无法中断，render 就一直占用着 JavaScript 的主线程，直到 render 结束.。如果应用中组件数量庞大，主线程被长期占用，直到整棵 VirtualDOM 树比对更新完成之后，主线程才能被释放，然后再执行其他任务。这就导致一些用户交互、动画等任务无法立即得到执行，造成页面卡顿的问题，影响用户体验。

### 三、请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

A:

- before mutation（执行 DOM 操作前）
  - 处理 DOM 节点渲染/删除后的 autoFocus、blur 逻辑。
  - 调用 getSnapshotBeforeUpdate 生命周期钩子。
  - 调度 useEffect。
- mutation（执行 DOM 操作）
  - 将 workInProgress Fiber 树变成 current Fiber 树
  - 如果该 fiber 类型是 ClassComponent 的话，执行 getSnapshotBeforeUpdate 生命周期 api，将返回的值赋到 fiber 对象的\_\_reactInternalSnapshotBeforeUpdate 上；如果该 fiber 类型是 FunctionComponent 的话，执行 hooks 上的 effect 相关 API。
  - 根据 ContentReset effectTag 重置文字节点；
  - 更新 ref；
  - 根据 effectTag 分别处理，其中 effectTag 包括(Placement | Update | Deletion | Hydrating)；
- layout（执行 DOM 操作后）
  > 与前两个阶段类似，layout 阶段也是遍历 effectList，执行函数。具体执行的函数是 commitLayoutEffects。 commitLayoutEffectOnFiber 方法会根据 fiber.tag 对不同类型的节点分别处理
  - 对于 ClassComponent，他会通过 current === null?区分是 mount 还是 update，调用 componentDidMount (opens new window)或 componentDidUpdate
  - 对于 FunctionComponent 及相关类型，他会调用 useLayoutEffect hook 的回调函数，调度 useEffect 的销毁与回调函数
    > 注：useEffect 需要先调度，在 Layout 阶段完成后再异步执行，
    > useLayoutEffect 是同步执行的

最后完成 current Fiber 树切换

### 四、请简述 workInProgress Fiber 树存在的意义是什么

A:
实现双缓存技术, 在内存中构建 DOM 结构以及 DOM 更新, 在 commit 阶段实现 DOM 的快速更新.
