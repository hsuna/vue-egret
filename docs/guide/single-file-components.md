# 单文件组件

## 介绍

在很多 VueEgret 项目中，我们使用 `VueEgret.component` 来定义全局组件，紧接着用 `VueEgret.classMain`创建页面舞台。

这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

- **全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复
- **字符串模板 (String templates)** 缺乏语法高亮，在 Template 有多行的时候，需要用到丑陋的 \
- **没有构建步骤 (No build step)** 限制只能使用 ES5 JavaScript，而不能使用预处理器，如 Babel

文件扩展名为 `.vue` 的 **single-file components (单文件组件)** 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

这是一个文件名为 `Hello.vue` 的简单实例：

```html
<template>
    <TextField>{{ greeting }} World!</TextField>
</template>

<script>
export default {
    data() {
        return {
            greeting: 'Hello'
        }
    }
} 
</script>
```

现在我们获得：

- 完整语法高亮
- ESM 模块

正如我们说过的，我们可以使用预处理器来构建简洁和功能更丰富的组件，比如 Babel (with ES6 modules)。

这些特定的语言只是例子，你可以只是简单地使用 Babel，TypeScript或者其他任何能够帮助你提高生产力的预处理器。

### 怎么看待关注点分离？

一个重要的事情值得注意，**关注点分离不等于文件类型分离**。在现代 UI 开发中，我们已经发现相比于把代码库分离成三个大的层次并将其相互交织起来，把它们划分为松散耦合的组件再将其组合起来更合理一些。在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护。

即便你不喜欢单文件组件，你仍然可以把 JavaScript 分离成独立的文件然后做到热重载和预编译。

```html
<!-- my-component.vue -->
<template>
  <TextField>This will be pre-compiled</TextField>
</template>
<script src="./my-component.js"></script>
```

## 起步

### 针对刚接触 JavaScript 模块开发系统的用户

有了 `.vue` 组件，我们就进入了高级 JavaScript 应用领域。如果你没有准备好的话，意味着还需要学会使用一些附加的工具：

- **Node Package Manager (NPM)**：阅读 [Getting Started guide](https://docs.npmjs.com/packages-and-modules/getting-packages-from-the-registry) 中关于如何从注册地 (registry) 获取包的章&节。

- **Modern JavaScript with ES2015/16**：阅读 Babel 的 [Learn ES2015 guide](https://babeljs.io/docs/learn-es2015/)。你不需要立刻记住每一个方法，但是你可以保留这个页面以便后期参考。

只要遵循指示，你就能很快地运行一个带有 `.vue` 组件、ES2015、webpack 和热重载 (hot-reloading) 的 Vue 项目！

### 针对高级用户

有时你会想从零搭建你自己的构建工具，这时你需要通过 [VueEgret Loader](https://github.com/hsuna/vue-egret-loader) 手动配置 webpack。关于学习更多 webpack 的内容，请查阅其[官方文档](https://webpack.js.org/configuration/)和 [Webpack Academy](https://webpack.academy/p/the-core-concepts)。