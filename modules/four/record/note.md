> 因内容过多，故笔记借鉴了网友 GouYh 的笔记，仅用于复习查阅，更多细节可直接查阅官方文档

1.模块化概述：当前最重要的前端开发范式
模块化演变过程；
模块化规范；
常用的模块化打包工具；
基于模块化工具构建现代 Web 应用；
打包工具的优化技巧；

2.模块化的演变过程：早期在没有工具和规范的情况下对模块化的落地方式
Stage1---文件划分方式
问题：1.污染全局作用域 2.命名冲突问题 3.无法管理模块依赖关系
早期模块化完全依靠约定

    Stage2---命名空间方式----暴露一个全局对象，所有的模块都挂载在这个全局对象下边

    Stage3----IIFE（立即执行函数）

3.模块化规范的出现：
CommonJS 规范（CommonJS 是以同步模式加载模块）：
一个文件就是一个模块；
每个模块都有单独的作用域；
通过 module.exports 导出成员；
通过 require 函数载入模块；
AMD（Asynchronous Module Definition）：require.js
约定每一个模块都通过 define 函数定义；
通过 require 加载模块；
目前绝大多数的第三方库都支持 AMD 规范；
AMD 使用起来相对复杂；
模块 JS 文件请求频繁，导致页面效率低下；
CMD：Sea.js

4.模块化标准规范（模块化的最佳实践）：
Nodejs 环境 CommonJS；
浏览器环境 ES Modules;

5.ES Modules 特性：
通过给 script 添加 type=module 的属性，就可以以 ES Module 的标准执行器重的 JS 代码;
1.ESM 自动采用严格模式，忽略“use strict”； 2.每个 ES Module 都是运行在单独的私有作用域中；
3.ESM 是通过 CORS 的方式请求外部 JS 模块的；
4.ESM 的 script 标签会延迟执行脚本，相当于默认添加了 defer 属性，不会阻碍页面中标签的显示；

6.ES Modules 导出：export(导出) / import(导入)

7.ES Modules 导入导出的注意事项：
1.export 导出的是对象的引用；
2.import 导入的是一个常量，不可修改；

8.ES Modules 导入用法： 1.必须有完整的文件名称 2.相对路径的./不能省略 3.可以使用绝对路径或完整的 url 4.可以使用 import {} from 'xxx' 或者 import 'xxx'，只执行，不导入某个变量 5.动态加载 import('xxx').then(function (module) {})

9.ES Modules 导出导入成员

10.ES Modules 浏览器环境 Polyfill：编译 ES6，兼容浏览器，script nomodule 属性判断浏览器是否兼容以决定是否加载

11.ES Modules in Node.js --支持情况：需注意第三方模块都是默认导出成员

12.ES Modules in Node.js 与 CommonJS 交互：
1.ES Module 中可以导入 CommonJS 模块
2.CommonJS 模块始终只会导出一个默认成员，CommonJS 中不能导入 ES Modules 模块
3.ES Module 不能直接提取成员，注意 import 不是解构导出对象
4.Node 环境中不能在 CommonJS 模块中通过 require 载入 ES Module

13.ES Modules in Node.js 与 CommonJS 的差异：
1.ES Module 中没有 CommonJS 中的那些模块全局成员了

14.ES Modules in Node.js 新版本进一步支持： 1.通过在 package.json 中指定 type: module 来指定 js 文件都已 ES Module 形式运行 2.在设置 type：module 时通过指定 js 后缀名为 cjs 来实行 CommonJS 规范

15.ES Modules in Node.js Babel 兼容方案： 1.命令行通过--presets=@babel/preset-env 来转换

16.模块化打包工具的由来：
1.ES Modules 存在环境兼容问题 2.模块文件过多，网络请求频繁 3.不仅仅只是 js 文件需要模块化，而是所有的前端资源都需要模块化

17.模块化打包工具概要：打包工具解决的是前端整体的模块化，并不单指 JavaScript 模块化

18.Webpack 配置文件：默认从 src/index.js 为入口输出到 dist/main.js

19.webpack 工作模式：
1.production：内部会自动启动一些优化插件，如压缩
2.development：自动优化打包的速度，添加一些调试的辅助工具
3.none：运行最原始状态的打包，不会做任何额外的处理

20.webpack 打包结果运行原理

21.webpack 资源模块加载：
css-loader 用于将 css 转换为 js 模块，打包 css 文件
style-loader 用于将 css-loader 转换后的结果用 style 标签作用于页面上
module----rules----use 的数组是从最后一个元素开始执行
loader 是 webpack 实现前端模块化的核心，通过不同的 loader 就可以实现去加载任何类型的资源

22.webpack 导入资源模块：Javascript 驱动了整个前端应用 1.逻辑合理，JS 确实需要这些资源文件 2.确保上线资源不缺失，都是必要的

23.webpack 文件资源加载器：
大部分资源加载器都是通过将资源转换为 js 模块来实现加载的，但是如图片等一些资源是无法通过转换为 js
模块来实现加载的，对于这一类的资源，使用文件资源加载器 file-loader

24、webpack URL 加载器：除了 file-loader 之外，还可以使用 url-loader 加载文件资源，可以将文件转为 data url 来实现资源加载
小文件使用 Data URLs，减少请求次数
大文件单独提取存放，提高加载速度

```js
module: {
  rules: [
    {
      test: /.js$/,
      use: {
        loader: "babel-loader",
        options: ["@babel/preset-env"],
      },
    },
    {
      test: /.css$/,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /.png$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10 * 1024, // 只将10kb以下的文件转换为data url，超过的还是使用                        // file-loader加载
        },
      },
    },
  ];
}
```

25.webpack 常用加载器分类： 1.编译转换类：如 css-loader 2.文件操作类型加载器：如 file-loader 3.代码质量检查加载器，为了统一代码风格，从而提高代码质量，一般不会修改生产环境代码：如 eslint-loader

26.Webpack 与 ES 2015：
1.webpack 因为模块打包需要，所以处理了 import 和 export，并不能处理代码中其他的 es6 特性
2.webpack 只是打包工具，加载器可以用来编译转换代码

27.webpack 加载资源的方式： 1.遵循 ES Modules 标准的 import 声明 2.遵循 CommonJS 标准的 require 函数 3.遵循 AMD 标准的 define 函数和 require 函数
4.Loader 加载的非 JavaScript 也会触发资源加载：如样式代码中的@import 指令和 url 函数
5.HTML 中图片标签的 src 属性

28.webpack 核心工作原理：
在项目中，一般都会散落着各种代码和配置，webpack 会顺着入口文件当中的代码，根据代码中出现的 import 或者 require 之类的语句，解析推断出这个文件的资源模块，然后分别解析每个模块的依赖的资源模块，然后形成一个文件依赖树，然后递归这个依赖树找到所对应的资源文件，根据配置文件中的 rules 属性找到对应的 loader 加载，最后将加载到的结果放到 bundle.js

29.Webpack 插件机制介绍：
增强 webpack 在项目自动化的能力
loader 专注实现资源模块加载，从而实现整体项目的打包
plugin 解决除了资源加载外其他的一些自动化操作，如：
清除 dist 目录
拷贝不需要参与打包的静态资源文件
压缩代码

30.webpack 自动清除输出目录插件：clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
plugin: [
new CleanWebpackPlugin()
]

31.webpack 自动生成 HTML 插件：html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

```js
plugin: [
  // 用于生成index.html
  new HtmlWebpackPlugin({
    // 少量自定义
    title: "xxx",
    meta: {
      viewport: "width=device-width",
    },
    // 大量自定义：在源代码中添加一个html模板
    template: "./src/index.html",
  }),
  // 同时输出多个html文件,用于生成about.html
  new HtmlWebpackPlugin({
    filename: "about.html",
  }),
];
```

32.webpack 插件使用总结：
使用 copy-webpack-plugin 拷贝不需要参与构建的静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin')

```js
plugins: [
  // 开发阶段最好不要使用这个插件，上线前使用
  new CopyWebpackPlugin([
    // 传入数组指定需要拷贝的文件路径，可以是一个通配符
    // 'public/**',
    "public",
  ]),
];
```

33.webpack 插件：plugin 通过钩子机制实现，webpack 要求插件必须是一个函数或者是一个包含 apply 方法的对象，
通过在 webpack 生命周期的钩子中挂载函数来实现扩展插件

34.Webpack 增强开发体验----实现自动编译，使用 watch 参数，监听文件变化，实现自动编译

35.Webpack 增强开发体验----实现自动打开浏览器，使用 browser-sync 启动服务 browser-sync dist --files "\*_/_",操作麻烦，效率降低了（webpack 将文件写入磁盘，browse-sync 将磁盘文件读出）

36.webpack-dev-server：提供了一个 Http-server，集成自动编译和自动刷新浏览器等功能

37.webpack-dev-server 静态资源访问：contentBase:额外为开发服务器指定查找资源目录
devServer: {
contentBase: [] | './public'
}

38.webpack-dev-server 代理 API：

```js
devServer: {
  proxy: {
    '/api': { // 代理以 api 开头的请求
    // http://localhost:8080/api/users --> https://api.github.com/api/users
    target: 'https://api.github.com',
    pathRewrite: {
    '^/api': ''
    },
    // 不能使用 localhost:8080 作为请求 Github 的主机名
    changeOrigin: true
    }
  }
}
```

39.Source Map：解决了源代码与运行代码不一致所产生的调试问题 1.运行代码与源代码之间完全不同 2.错误信息无法定位 3.调试和报错都是基于运行代码进行的
4.source map 用来映射源代码和运行代码的关系
version // 当前文件使用的 sourceMap 版本
sources // 记录转换前源文件的名称，可能是多个文件转化为一个文件，故为一个数组
names // 源代码中使用的一些成员名称
mappings // 核心属性，base64-vlq 编码的字符串，记录转化后代码中的字符与转换前的映射关系
//# sourceMappingURL=xxx 以注释的形式引入 sourceMap

    devtool: 'source-map' // 配置开发过程中的一些辅助工具

    webpack对source Map的风格支持了12种不同的方式，每种方式的效率和效果各不相同，效果最好的，生成速度最慢，速度最快的，效果一般不行

40.webpack eval 模式的 source Map：只能定位文件，不会生成 source map 文件，构建速度最快，效果只能定位源代码文件名称

41.Webpack devtool 模式对比：
a：eval----是否使用 eval 执行模块代码
b：cheap----Source Map 是否包含行信息
c：module----是否能够得到 Loader 处理之前的源代码

    1.eval模式：将代码放到js eval函数下运行，只能定位出现错误的文件名称，不会生成source-map文件
    2.eval-soure-map：同样使用eval函数执行代码，除了定位错误出现的文件，还能定位到行和列的信息，生成了source-map文件
    3.cheap-eval-source-map：对比eval-source-map，只定位到行的信息，没有定位到列信息，但速度更快
    4.cheap-module-eval-source-map：对比cheap-eval-source-map，同样只能定位到行的信息，带有module的模式下，解析出的源代码是没有经过loader加工的源代码，而不带module的是经过loader加工后的代码
    5.cheap-souce-map：没有用eval方式执行代码
    6.inline-source-map：source-map是以物理文件存在，inline-source-map是已dataUrl的形式将source map嵌入到代码中，导致代码体积变大很多
    7.hidden-source-map：在开发工具中看不到sourceMap效果，但是是生成了sourceMap文件，但不在代码中直接引入，一般用于开发第三方包
    8.nosources-source-map：能看到错误出现的位置，点击错误信息，是看不到源代码的，即没有源代码，但能指示错误位置

42.Webpack 选择 Source map 模式：
开发环境：cheap-module-eval-source-map
生产环境：none，// source map 会暴露源代码

43.Webpack 自动刷新的问题：
自动刷新导致的页面状态丢失，希望页面不刷新的前提下，模块也可以及时更新

44.Webpack HMR 体验：HMR：Hot Module Replacement，模块热替换/模块热更新，
热拔插：在一个运行的机器上随时插拔设备
热替换：在应用运行过程中，实时替换应用某个模块，不会改变应用状态

```js
import webpack = require('webpack')
devServer: {
hot: true
},
plugins: [
new webpack.HotModuleReplacementPlugin()
]
```

此处配置，只解决了 css 模块的热替换，并未解决 js 模块的热替换
webpack 中的 HMR 并不能开箱即用，而是需要手动处理模块热替换逻辑
样式文件的热更新，是 style-loader 中自动处理了

45.webpack HMR API：

```js
let lastEditor = editor
module.hot.accept('./editor', () => {
console.log('editor 模块更新了，需要这里手动处理热替换逻辑‘)
ducument.body.removeChild(lastEditor)
const newEditor = createEditor()
document.body.appendChild(newEditor)
lastEditor = newEditor
})
```

46.图片模块热替换：

```js
module.hot.accept("./better.png", () => {
  img.src = "xxx";
});
```

47.webpack HMR 注意事项： 1.处理 HMR 的代码报错会导致自动刷新（使用 hotOnly 来解决）

```js
devServer: {
  hotOnly: true;
}
```

2.启用 HMR 的情况下，HMR API 报错(先判断是否存在模块，再使用) 3.代码中多了一些与业务无关的代码（在代码压缩后会自动去掉）

48.webpack 生产环境优化：
生产环境和开发环境存在很大的差异，生产环境注重运行效率，开发环境注重开发效率，使用 mode 为不同的工作环境创建不同的配置 1.配置文件根据环境不同导出不同配置 2.一个环境对应一个配置文件(使用 webpack-merge 合并配置)

49.Webpack DefinePlugin：为代码注入全局成员

```js
const webpack = require("webpack");
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: '"xxxxx"', // 此处需要传入的是一段 js 代码片段，故采用'""'形式
    }),
  ],
};
```

50.webpack 体验 Tree Shaking： 去除代码中未引用代码，会在生产模式下自动开启
Tree Shaking 并不是指 webpack 中某个配置选项，是一组功能搭配后的使用效果

```js
module.exports = {
  optimization: {
    usedExports: true, // 标记那些是未引用代码
    minimize: true, // 负责去除未引用代码
  },
};
```

51.Webpack 合并模块：Scope Hoisting（作用域提升）

```js
module.exports = {
  optimization: {
    usedExports: true, // 标记那些是未引用代码
    concatenateModules: true, // 尽可能的将所有模块合并输出到一个函数中，
    // 既提升了运行效率，又减少了代码的输出体积
    minimize: true, // 负责去除未引用代码
  },
};
```

52.Webpack Tree Shaking 与 Babel：（很多地方介绍 Tree Shaking 与 Babel-loader 冲突）
Tree Shaking 的实现前提是 ES Modules，由 Webpack 打包的代码必须使用 ESM
而在 webpack 打包过程中，会对不同的模块使用不同的 loader 进行加载，babel-loader 会将 ESM 转换
不过在新版本的 babel-loader，已经兼容了该问题

53.Webpack sideEffects: 允许我们通过配置的方式去标识代码是否有副作用，一般用于 npm 包标记是否有副作用
副作用：是指模块执行时除了导出成员之外所做的事情

```js
module.exports = {
  optimization: {
    usedExports: true, // 标记那些是未引用代码
    sideEffects: true, // 在 production 模式会自动开启，开启后会检查 package.json 中是否含有 // sideEffects 字段，以此判断模块是否有副作用
    concatenateModules: true, // 尽可能的将所有模块合并输出到一个函数中，
    // 既提升了运行效率，又减少了代码的输出体积
    minimize: true, // 负责去除未引用代码
  },
};
```

需要配置两个地方，optimization 中开启，以及在 package.json 中标记
使用前提： 1.确保你的代码真的没有副作用，原型链定义函数以及 css 模块都属于副作用

54.Webpack 代码分割：
问题：webpack 代码打包将所有代码打包到了一起，如果应用复杂，模块多，bundle.js 体积将会很大
并不是每个模块在启动时都是必要的
解决：分包，按需加载，多入口打包，动态导入

55.webpack 多入口打包：一个页面对应一个打包入口，公共部分单独提取

```js
entry: {
  index: 'xxxx',
  album: 'xxx'
},
output: {
  filename: '[name].bundle.js'
},
plugins: [
  new HtmlWebpackPlugin({
    title: 'xx',
    template: 'xxx'
    filename: 'xxx',
    chunks: ['index']
  }),
  new HtmlWebpackPlugin({
    title: 'xx',
    template: 'xxx'
    filename: 'xxx',
    chunks: ['album']
  })
]
```

56.webpack 提取公共模块：

```js
optimization: {
  splitChunks: {
    chunks: "all"; // 所有的公共模块提取到 bundle 中
  }
}
```

57.webpack 动态导入：
按需加载：需要用到某个模块时，再加载这个模块
所有动态导入的模块都会自动提取到单独的 bundle 中，从而实现分包

58.Webpack 魔法注释：通过添加行内注释，给分包所产生的 bundle 命名

```js
import(/_ webpackChunkName: 'xxx' _/'.xxx').then
```

命名重复之后，会被打包到一起

59.webpack MiniCssExtractPlugin：

```js
plugins: [
  new MiniCssExtractPlugin(), // 将样式单独存放到文件中，可以使用 MiniCssExtractPlugin.loader 取 // 代 style-loader
];
```

60.webpack OptimizeCssAssetsWebpackPlugin: 用于压缩输出的 css 文件

```js
const TerserWebpackPlugin = require("terser-webpack-plugin");
optimization: {
  minimizer: [
    new TerserWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin(), // 会覆盖内置的 js 压缩插件，需要单独再引入
  ];
}
```

61.webpack 输出文件名 Hash：
3 种 hash：
hash：所有文件相同 hash
chunkhash: 属于同一个 chunk 的文件有一个 hash，解决缓存问题最好的解决方式
contenthash：不同的文件内容有一个 hash
默认长度 20 位，可以通过 hash:8 指定长度

62.Rollup 概述：
Rollup 更为小巧，仅仅是一款 ESM 打包器，Rollup 中并不支持类似 HMR 这种高级特性，其并不是
要与 webpack 之类的工具全面竞争，只是为了提供一个充分利用 ESM 各项特性的高效打包器，
会默认开启 tree shaking 效果。
Rollup 中使用动态导入的方式，打包过程中会自动实现代码拆分，但是输出格式不支持 iife

63.Rollup 选用原则：
rollup 优势： 1.输出结果更加扁平，执行效率更高 2.自动移除未引用代码 3.打包结果依然完全可读
rollup 缺点： 1.加载非 ESM 的第三方模块比较复杂 2.模块最终都被打包到一个函数中，无法实现 HMR 3.浏览器环境中，代码拆分功能依赖 AMD 库
选用原则：
开发一个框架或者类库 =====> rollup
应用程序 =======> webpack

64.Parcel：零配置的前端应用打包器

65.规范化标准： 1.软件开发需要多人协同 2.不同开发者具有不同的编码习惯和喜好 3.不同的喜好增加项目维护成本 4.每个项目或者团队需要明确统一的标准

66.Eslint 介绍： 1.最为主流的 JavaScript Lint 工具检测 JS 代码
2.ESLint 很容易统一开发者的编码风格
3.EsLint 可以帮助开发者提升编码能力

67.EsLint 结合 Webpack：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: "babel-loader",
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: "eslint-loader",
      enforce: "pre", // 设置 loader 优先级高于其他 loader
    },
  ];
}
```

68.Stylelint 认识： 1.提供默认的代码检查规则 2.提供 CLI 工具，快速调用 3.通过插件支持 Sass Les PostCSS 4.支持 Gulp 或 Webpack 集成

69.Prettier 的使用：用于格式化代码

70.Git Hooks 工作机制：
问题：代码提交至仓库之前未执行 lint 工作
通过 Git Hooks 在代码提交前强制 lint
介绍：
1.Git Hook 也称之为 git 钩子，每个钩子都对应一个任务 2.通过 shell 脚本可以编写钩子任务触发时要具体执行的操作
通过钩子对应具体的操作，在操作发生时去执行钩子定义的内容

71.EsLint 结合 Git Hooks： 1.很多前端开发者并不擅长使用 shell
2.Husky 可以实现 Git Hooks 的使用需求

```json
/_ package.json _/
  "husky": {
    "hooks": {
      "pre-commit": "npm run test"
    }
  },
  "lint-staged": {
    "\*.js": [ // 可以添加后续任务
      "eslint",
      "git add"
  ]
}
```
