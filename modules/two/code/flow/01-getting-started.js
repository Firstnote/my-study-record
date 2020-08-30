//@flow
//添加该标记，flow才会检查

// 可通过JavaScript validate选项关闭vscodejs类型检查
// 编译：1.flow-remove-types，2.通过babel，配置babelrc的presets编译
// vscode插件flow-language-support
function sum(a: number, b: number) {
  return a + b;
}
sum(100, 100);
// sum("100", "100");
