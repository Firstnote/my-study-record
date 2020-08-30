// 可选成员、只读成员、动态成员

export {}; // 确保跟其它示例没有成员冲突

// -------------------------------------------

interface Post {
  title: string;
  content: string;
  subtitle?: string;
  readonly summary: string; //只读成员，初始化之后禁止修改
}

const hello: Post = {
  title: "Hello TypeScript",
  content: "A javascript superset",
  summary: "A javascript",
};

// hello.summary = 'other'

// ----------------------------------

interface Cache {
  [prop: string]: string; //动态属性，prop不是指定关键词,只是个象征
}

const cache: Cache = {};

cache.foo = "value1";
cache.bar = "value2";
