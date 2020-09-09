#!/usr/bin/env node
// 需要使用node执行，不然可能会出现文本编码问题
const program = require("commander");
const packageInfo = require("../../package.json");

const add = require('../lib/cmd/add')
const init = require('../lib/cmd/init')
const remove = require('../lib/cmd/remove')
program.version(packageInfo.version);

program
	.command("init") //fn-cli init
	.description("初始化一个项目") //描述
	.alias("i") //命令简写
	.action(() => {
		init.init();
	});

program
	.command("add") //fn-cli add
	.description("添加模版")
	.alias("a")
	.action(() => {
		add.add();
	});

program
	.command("remove") //fn-cli remove
	.description("移除模版")
	.alias("r")
	.action(() => {
		remove.remove();
	});

program.parse(process.argv);

if (!program.args.length) {
	program.help();
}
