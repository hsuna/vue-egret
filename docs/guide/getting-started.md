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

```javascript
var Main = VueEgret.classMain({
  data() {
    return {
      message: 'Hello VueEgret!',
    };
  },
  template: `<TextField>{{text}}</TextField>`,
});
```

## 条件与循环

控制切换一个元素是否显示也相当简单：

```javascript
var Main = VueEgret.classMain({
  data() {
    return {
      seen: true,
    };
  },
  template: `<Sprite>
    <TextField v-if="seen">Hello VueEgret!</TextField>
  </Sprite>`,
});
```

`v-for` 指令可以绑定数组的数据来渲染一个项目列表：

```javascript
var Main = VueEgret.classMain({
  data() {
    return {
      todos: [
        { top: 0, text: 'VueEgret' },
        { top: 30, text: 'Sprite' },
        { top: 60, text: 'TextField' },
      ],
    };
  },
  template: `<Sprite>
    <TextField v-for="todo in todos" :y="todo.top">{{todo.text}}</TextField>
  </Sprite>`,
});
```

## 处理用户交互

为了让用户和你的应用进行交互，我们可以用 `v-on` 指令添加一个事件监听器，通过它调用在 VueEgret 实例中定义的方法：

```javascript
var Main = VueEgret.classMain({
  data() {
    return {
      text: 'Hello Word!!!',
    };
  },
  methods: {
    onTextClick() {
      this.text = 'Text is Click';
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
    <TextField>{{text}}</TextField>
  </Sprite>`,
});
```

## 组件化应用构建

组件系统是 VueEgret 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：

![components](./images/components.png)

::: demo

```javascript
var Main = VueEgret.classMain({
  data() {
    return {
      text: 'Hello Word!!!',
    };
  },
  methods: {
    onTextClick() {
      this.text = 'Text is Click';
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
    <TextField>{{text}}</TextField>
  </Sprite>`,
});
```

:::
