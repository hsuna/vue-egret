import Vue from 'vue'
Vue.component("demo-component", () => import("E:\\github\\hsuna\\vue-egret-docs\\src\\.vuepress\\components\\demo-component"))
Vue.component("OtherComponent", () => import("E:\\github\\hsuna\\vue-egret-docs\\src\\.vuepress\\components\\OtherComponent"))
Vue.component("Foo-Bar", () => import("E:\\github\\hsuna\\vue-egret-docs\\src\\.vuepress\\components\\Foo\\Bar"))
Vue.component("Badge", () => import("E:\\github\\hsuna\\vue-egret-docs\\node_modules\\@vuepress\\theme-default\\global-components\\Badge"))


export default {}