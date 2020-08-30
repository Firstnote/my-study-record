// 接口

export {}; // 确保跟其它示例没有成员冲突
// 分隔号应该为分号，逗号也可，但是建议为分号，也可不加分隔号
interface Post {
  title: string;
  content: string;
}

function printPost(post: Post) {
  console.log(post.title);
  console.log(post.content);
}

printPost({
  title: "Hello TypeScript",
  content: "A javascript superset",
});
