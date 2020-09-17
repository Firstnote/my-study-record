# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

A:

- lint

  - 根据 eslintConfig 的配置安装"eslint"，"eslint-plugin-vue"，"babel-eslint"作为开发依赖
  - 修改 lint 命令文本为` "lint": "eslint --ext .js,.vue src"`

- build
  
  - 安装vue及vue-loader，以及其他相关依赖用于编译vue文件
  - 安装less及less-loader，用于处理less，由于js全局引入了less，因此在使用时需要使用style-loader将编译后的css注入，vue当中的css及less则最后采用vue-style-loader注入(此处关于vue-style-loader为何没将全局css注入的问题，官方文档未曾说明)，采用mini-css-extract-plugin拆分css
  - 安装webpack相关依赖用于处理各种模块及启动服务和多配置打包，注入全局变量
  - 安装相关插件用于清除构建前文件夹以及生成模版html
  - 安装babel-loader配合@vue/cli-plugin-babel/preset转换js代码
  - 安装copy-webpack-plugin拷贝静态资源
  - 修改 build 命令文本为` "webpack --config webpack.prod.js"`

- serve

  - 配置webpack.dev.js
  - 注入css用于支持热更新
  - 配置静态资源访问路径减少磁盘读写
  - 修改 serve 命令文本为`"webpack-dev-server --config webpack.dev.js"`

  > 更多说明参考项目配置中注释