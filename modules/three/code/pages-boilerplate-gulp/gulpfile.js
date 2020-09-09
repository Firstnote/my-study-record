// 实现这个项目的构建任务
const { src, dest, parallel, series } = require("gulp");

const del = require("del");
const browserSync = require("browser-sync");

const loadPlugins = require("gulp-load-plugins");
const { notify, watch } = require("browser-sync");

const plugins = loadPlugins(); //自动引入gulp插件的插件

const bs = browserSync.create();

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};

const clean = () => {
  return del(["dist"]);
};

const style = () => {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("dist"));
};

const script = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("dist"));
};

const page = () => {
  return src("src/*.html", { base: "src" })
    .pipe(plugins.swig({ data }))
    .pipe(dest("dist"));
};

const image = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const font = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};

const serve = () => {
  watch("src/assets/styles/*.scss", style);
  watch("src/assets/scripts/*.js", script);
  watch("src/*.html", page);
  watch("src/assets/images/**", image);
  watch("src/assets/font/**", image);
  watch("public/**", extra);
  //监听文件变化
  bs.init({
    notify: false,
    port: 2080,
    // open: false,
    files: "dist/**",
    server: {
      baseDir: "dist",
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

const lint = () => {
  return src("src/**.js")
    .pipe(
      plugins.eslint({
        rules: {
          strict: 0,
        },
        globals: ["jQuery", "$"],
        envs: ["browser"],
      })
    )
    .pipe(
      plugins.eslint.results((res) => {
        console.log(res);
      })
    );
};

//各个模块互不干扰，异步构建
const compile = parallel(style, script, page, image, font);

//清理文件后重新构建，同步
const build = series(clean, parallel(compile, extra));

//同步编译后再启动服务
const start = series(compile, serve);

const deploy = () => {
  // TODO
};
module.exports = {
  compile,
  build,
  serve,
  clean,
  lint,
  start,
};
