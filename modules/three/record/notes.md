# 工程化

## 1.工程化主要解决的问题

- 传统语言或语法的弊端
- 无法使用模块化 / 组件化
- 重复的机械式工作
- 代码风格统一、质量保证
- 依赖后端服务接口支持
- 整体依赖后端项目

## 2.工程化表现

- 一切提高效率、降低成本、质量保证为目的的手段都属于工程化

# 脚手架工具

## 1.脚手架工具概要

- 相同的组织结构
- 相同的开发范式
- 相同的模块依赖
- 相同的工具配置
- 相同的基础代码

## 2.常用脚手架工具

- yeoman 创建项目时使用，根据一套模板生成一个对应的项目结构，通用、灵活
- plop 在项目开发过程，创建特定类型的文件，例如创建一个组件/模块所需要的文件

### yeoman

- 全局安装：
  - yarn global add yo 或者 npm install -g yo
- 安装对应的 generator：例如 node module 安装
  - yarn global add generator-node 或者 npm install -g generator-node
- 创建项目：

  - yo node

- 使用步骤总结
  - 明确需求
  - 找到合适的 generator
  - 全局安装 generator
  - 通过 yo 运行对应的 generator
  - 通过命令交互填写选项
  - 生成需要的项目结构

### 创建 generator 模块

- generator 基本结构

```
 ∣- generators/ .....................生成器目录
 ∣  ∟ app/ ..........................默认生成器目录
 ∣ ∣  ∟ index.js ...................默认生成器实现
+∣  ∟ component/ ....................其他生成器目录
+∣     ∟ index.js ...................其他生成器实现
  ∟  package.json ....................默认生成器实现

```

- 模块名称：generator-<name>
- 创建

  - 初始化项目：yarn init
  - 安装 generator：yarn add yeoman-generator
  - 链接到全局使当前 generator 模块变成全局模块包：yarn link 或者使用 npm link
    - 解除链接 yarn unlink
  - 使用：yo 模块名
  - 根据模板创建文件
    - 提高效率

- 发布
  - 将 generator 模块推送到 GitHub 托管
  - 使用命令发布 yarn publish ，如果报错使用 yarn publish --registry=https://registry.yarnpkg.com

### plop 作为项目开发依赖安装

- 安装到项目的开发依赖
  - yarn add plop --dev
- 在跟目录创建 plopfile.js 文件

  ```
  // plop 入口文件，需要导出一个函数
  // 此函数接收一个 plop 对象，用于创建生成器任务

  module.exports = plop => {
      plop.setGenerator('component', {
          description: 'create a component',
          prompts: [
              {
                  type: 'input',
                  name: 'name',
                  message: 'component name',
                  default: 'myComponent'
              }
          ],
          actions: [
              {
                  type: 'add',    // 代表添加文件
                  path: 'src/components/{{name}}/{{name}}.js',
                  templateFile: 'plop-templates/component.hbs'
              },
              {
                  type: 'add',    // 代表添加文件
                  path: 'src/components/{{name}}/{{name}}.css',
                  templateFile: 'plop-templates/component.css.hbs'
              },
              {
                  type: 'add',    // 代表添加文件
                  path: 'src/components/{{name}}/{{name}}.test.js',
                  templateFile: 'plop-templates/component.test.hbs'
              }
          ]
      })
  }
  ```

- 创建对应的模板对象文件 plop-templates/component.hbs
- 使用：yarn plop component // component 为创建的模块名称

# 自动化构建

## 1.概念

- 用命令的方式代替一切重复工作
- 实现自动化构建工作的最简单方式：NPM Scripts
- 常用的自动化构建工具
  - grunt
  - gulp
  - fis

## 2.Grunt

- 初始化项目： yarn init --yes
- 安装：yarn add grunt
- 在根目录下创建 gruntfile.js 入口文件
- 注册 grunt 事件

```
// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形象，内部提供一些创建任务时可以用到的 API

const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    // 配置任务方法
    grunt.initConfig({
        bar: {
            name: '123456'
        },

        build: { //多目标任务
            options: {
                foo: 'bar'
            },
            css: {
                options: {
                    foo: 'css'
                },
                data: '1'
            },
            js: '2'
        },
        clean: { // 插件
            temp: 'temp/app.js'
        },
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: { //目标目录：源目录
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: { //目标目录：源目录
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['bable']
            },
            css: {
                files: ['src/css/*.scss'],
                tasks: ['bable']
            }
        }
    })

    grunt.registerTask('foo', () => {
        console.log("hello grunt foo")
        // 标记任务失败
        // return false
    })
    grunt.registerTask('bar', '任务描述', () => {
        console.log("hello grunt bar")
        // 获取配置属性
        console.log(grunt.config('bar.name'))
    })
    // 默认任务 不需要加任务名就可以运行
    // grunt.registerTask('default', () => {
    //     console.log("hello grunt default")
    // })
    // 默认任务一般使用方式
    grunt.registerTask('default', ['foo', 'bar'])

    // 异步任务
    grunt.registerTask('async-task', function(){
        const done = this.async();
        setTimeout(() => {
            console.log("hello grunt async-task")
            done()
            // 标记任务失败
            // done(false)
        }, 1000)
    })

    // 多目标模式，可以让任务根据配置形成多个子任务
    grunt.registerMultiTask('build', function(){
        console.log(this.options())
        console.log(`target: ${this.target}, data: ${this.data}`)
    })

    // 插件使用
    // grunt.loadNpmTasks('grunt-contrib-clean')

    // 使用sass插件
    // grunt.loadNpmTasks('grunt-sass')

    // 自动加载所有的 grunt 插件中的任务
    loadGruntTasks(grunt)
}

```

- 执行定义的任务：yarn grunt foo
  - 查看所有任务：yarn grunt --help
- 插件的使用
  - 添加插件依赖
  - 定义要执行的任务
- 常用插件
  - load-grunt-tasks 自动加载所有的 grunt 插件中的任务
  - grunt-sass 样式编译
  - grunt-babel js 编译
  - grunt-contrib-watch 启动监听

## 3.Gulp

- 初始化项目： yarn init --yes
- 安装：yarn add gulp --dev
- 在根目录下创建 gulpfile.js 入口文件
- 注册 gulp 事件

```
// gulp 的入口文件

// 旧版本写法
// const gulp = require('gulp')
// gulp.task('bar', done => {
//     console.log('bar task gulp')
//     done()
// })

const { series, parallel } = require('gulp')

exports.foo = done => {
    console.log('foo task gulp')
    // 标识任务完成
    done()
}

// 默认任务
exports.default = done => {
    console.log('default task gulp')
    // 标识任务完成
    done()
}

const task1 = done => {
    setTimeout(() => {
        console.log('task1 task gulp')
        // 标识任务完成
        done()
    }, 1000)
}

const task2 = done => {
    setTimeout(() => {
        console.log('task2 task gulp')
        // 标识任务完成
        done()
    }, 1000)
}

const task3 = done => {
    setTimeout(() => {
        console.log('task3 task gulp')
        // 标识任务完成
        done()
    }, 1000)
}


// 组合任务 串行(依次)执行
exports.foo2 = series(task1, task2, task3)

// 组合任务 同步执行
exports.bar = parallel(task1, task2, task3)

```

- 运行：yarn gulp foo

## 4.Gulp 构建过程核心工作原理

- 输入（读取流）=> 加工（转换流）=> 输出（写入流）

```
const fs = require('fs')
const {Transform} = require('stream')

exports.transform = () => {
    // 文件读取流
    const read = fs.createReadStream('normalize.css')
    // 文件写入流
    const write = fs.createWriteStream('normalize.min.css')
    // 文件转换流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            // 核心转换过程实现
            // chunk => 读取流中读到的内容（Buffer）
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callback(null, output)
        }
    })
    // 把读取出来的文件流导入写入文件流
    // 转换 写入
    read.pipe(transform).pipe(write)
    return read
}
```

## 5.Fis

- 全局安装：yarn global add fis3
- 构建项目： fis3 release -d output
