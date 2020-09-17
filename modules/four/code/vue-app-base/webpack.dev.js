const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const dev = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: "./public", //生产环境采用拷贝的方式将静态资源导入，开发环境则采用该配置让devserver访问资源路径减少磁盘的读写
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "less-loader"], //js全局引入less需要采用style-loader注入
      },
    ],
  },
};
module.exports = merge(common, dev);
