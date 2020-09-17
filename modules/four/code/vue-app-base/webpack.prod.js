const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = merge(common, {
  mode: "none",
  devtool: "none",
  output:{
    publicPath: "./", //html中引入资源路径前缀，例如：'assets/'则引入'assets/bundle.js'，同时也是Devserver的基准路径
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"], //生产环境分割css代码
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
    new CopyWebpackPlugin({patterns:['./public/favicon.ico']})
  ],
});
