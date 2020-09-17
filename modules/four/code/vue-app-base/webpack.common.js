const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");
module.exports = {
  entry: {
    app: "./src/main.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file), //用于转译node_modules中vue单文件的script标签
      },
      {
        test: /.png$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024, // 10 KB
            esModule: false, //file-loader支持es模式，需要手动关闭
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: '"./"', // 此处需要传入的是一段 js 代码片段，故采用'""'形式
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "vue-app-base",
      template: "./public/index.html",
      // favicon: "./public/favicon.ico", //可在新建html的时候定义favicon，或者采用全局变量注入地址，然后将图标通过copywebpackplugin拷贝至目标地址
    }),
  ],
};
