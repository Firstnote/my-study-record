let _Vue = null;
export default class VueRouter {
  static install(Vue) {
    //1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //2 把Vue的构造函数记录在全局
    _Vue = Vue;
    //3 把创建Vue的实例传入的router对象注入到Vue实例
    // _Vue.prototype.$router = this.$options.router
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    // 模式选择
    this.mode = options.mode === 'history'?'history':'hash'
    this.routeMap = {};
    // observable
    this.data = _Vue.observable({
      current: "/",
    });
    this.init();
  }
  init() {
    this.createRouteMap();
    this.initComponent(_Vue);
    this.initEvent.bind(this)();
  }
  createRouteMap() {
    //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  initComponent(Vue) {
    const self =this
    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickhander,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickhander(e) {
          self.isHash()?window.location.replace(getUrl(this.to)):history.pushState({}, "", this.to);
          this.$router.data.current = self.isHash()?(this.to):window.location.pathname;
          e.preventDefault(this.$router.data.current);
        },
      },
    });
    Vue.component("router-view", {
      render(h) {
        const cm = self.routeMap[self.data.current];
        return h(cm);
      },
    });
  }
  initEvent() {
    const eventType = this.isHash()?'hashchange':'popstate'
    window.addEventListener(eventType, () => {
      const href = window.location.href
      const i = href.indexOf('#')
      const path =href.slice(i+1)
      this.data.current = i>0?path:window.location.pathname
    });
  }
  isHash(){
    return this.mode === 'hash'
  }
  
}
function getUrl (path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i >= 0 ? href.slice(0, i) : href
  return `${base}#${path}`
}