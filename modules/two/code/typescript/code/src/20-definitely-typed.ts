// 类型声明

import { camelCase } from "lodash"; //可安装该模块的类型声明，在node_modules/@types
// import qs from "query-string";

// qs.parse("?key=value&key2=value2");

// declare function camelCase(input: string): string;//对没有类型声明的模块或方法指定类型声明

const res = camelCase("hello typed");

export {}; // 确保跟其它示例没有成员冲突
