# 起步

## 安装

### 直接用 \<script\> 引入

```html
<!-- 开发环境版本 -->
<script src="[CDN]/dist/vue-egret.js"></script>
<!-- 生产环境版本，压缩版本 -->
<script src="[CDN]/dist/vue-egret.min.js"></script>
```

### NPM

NPM 能很好地和 webpack 模块打包器配合使用。同时结合 Loader 配套工具来开发单文件组件。

```sh
# 最新稳定版
$ npm install vue
```

## 声明式渲染

VueEgret 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 egret 引擎的系统：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    message: 'Hello VueEgret!',
  },
  template: `<TextField>{{message}}</TextField>`,
});
```

:::

## 条件与循环

控制切换一个元素是否显示也相当简单：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    seen: true,
  },
  template: `<Sprite>
    <TextField v-if="seen">Hello VueEgret!</TextField>
  </Sprite>`,
});
```

:::

`v-for` 指令可以绑定数组的数据来渲染一个项目列表：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    todos: [
      { top: 0, text: 'VueEgret' },
      { top: 30, text: 'Sprite' },
      { top: 60, text: 'TextField' },
    ],
  },
  template: `<Sprite>
    <TextField v-for="todo in todos" :y="todo.top">{{todo.text}}</TextField>
  </Sprite>`,
});
```

:::

## 处理用户交互

为了让用户和你的应用进行交互，我们可以用 `v-on` 指令添加一个事件监听器，通过它调用在 VueEgret 实例中定义的方法：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    count: 0,
  },
  methods: {
    onTextClick() {
      this.count++;
    },
  },
  template: `<Sprite touchEnabled="true" v-on:touchTap="onTextClick">
    <TextField>Click Times is {{count}}</TextField>
  </Sprite>`,
});
```

:::

## 组件化应用构建

组件系统是 VueEgret 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![components](./images/components.png)

在 VueEgret 中注册组件很简单：

::: demo

```javascript
// 定义名为 MyLabel 的新组件，字体颜色为红色
VueEgret.component('MyLabel', {
  template: '<TextField textColor="#FF0000">Hello VueEgret!</TextField>',
});

var Main = VueEgret.classMain({
  template: `<MyLabel></MyLabel>`,
});
```

:::

但是这样每个组件渲染的则是同样的内容，我们应该能从父作用域将数据传到子组件才对。让我们来修改一下组件的定义，使之能够接受一个 prop，同时我们使用 v-bind 指令将内容传到循环输出的每个组件中：

::: demo

```javascript
// 定义名为 MyLabel 的新组件，字体颜色为红色
VueEgret.component('MyLabel', {
  props: ['top', 'message'],
  template: '<TextField textColor="#FF0000" :y="top">{{message}}</TextField>',
});

var Main = VueEgret.classMain({
  data: {
    todos: ['VueEgret', 'MyLabel', 'TextField'],
  },
  template: `<Sprite>
    <MyLabel v-for="(todo, index) in todos" v-bind:top="index*30" v-bind:message="todo"></MyLabel>
  </Sprite>`,
});
```

:::

尽管这只是一个刻意设计的例子，但是我们已经设法将应用分割成了两个更小的单元。子单元通过 prop 接口与父单元进行了良好的解耦。我们现在可以进一步改进 \<MyLabel> 组件，提供更为复杂的模板和逻辑，而不会影响到父单元。

在一个大型应用中，有必要将整个应用程序划分为组件，以使开发更易管理。

## 准备好了吗？

我们刚才简单介绍了 VueEgret 核心最基本的功能——本教程的其余部分将更加详细地涵盖这些功能以及其它高级功能，所以请务必读完整个教程！
