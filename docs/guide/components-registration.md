# 组件注册

> 该页面假设你已经阅读过了[组件基础](./components.html)。如果你还对组件不太了解，推荐你先阅读它。

## 组件名

在注册一个组件的时候，我们始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```javascript
VueEgret.component('MyComponentName', { /* ... */ })
```

该组件名就是 `VueEgret.component` 的第一个参数。

你给予组件的名字相当于类名，取决于你打算拿它来做什么，需要遵循**帕斯卡命名法**。


## 全局注册

到目前为止，我们只用过 `VueEgret.component` 来创建组件：

```javascript
VueEgret.component('MyComponentName', {
  // ... 选项 ...
})
```

这些组件是**全局注册**的。也就是说它们在注册之后可以用在任何新创建的 VueEgret 实例模板中。比如：

```javascript
VueEgret.component('ComponentA', { /* ... */ })
VueEgret.component('ComponentB', { /* ... */ })
VueEgret.component('ComponentC', { /* ... */ })
```

```html
<Sprite>
  <ComponentA></ComponentA>
  <ComponentB></ComponentB>
  <ComponentC></ComponentC>
</Sprite>
```

在所有子组件中也是如此，也就是说这三个组件在各自内部也都可以相互使用。

## 局部注册

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```javascript
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
```

然后在 `components` 选项中定义你想要使用的组件：

```javascript
var Main = VueEgret.classMain({
  components: {
    ComponentA: ComponentA,
    ComponentB: ComponentB
  }
})
```
对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

注意**局部注册的组件在其子组件中不可用**。例如，如果你希望 `ComponentA` 在 `ComponentB` 中可用，则你需要这样写：

```javascript
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    ComponentA: ComponentA
  },
  // ...
}
```

或者如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来更像：

```javascript
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

注意在 ES2015+ 中，在对象中放一个类似 `ComponentA` 的变量名其实是 `ComponentA: ComponentA` 的缩写，即这个变量名同时是：

* 用在模板中的自定义元素的名称
* 包含了这个组件选项的变量名

## 模块系统

如果你没有通过 `import`/`require` 使用一个模块系统，也许可以暂且跳过这个章节。如果你使用了，那么我们会为你提供一些特殊的使用说明和注意事项。

### 在模块系统中局部注册

如果你还在阅读，说明你使用了诸如 Babel 和 webpack 的模块系统。在这些情况下，我们推荐创建一个 `components` 目录，并将每个组件放置在其各自的文件中。

然后你需要在局部注册之前导入每个你想使用的组件。例如，在一个假设的 `ComponentB.js` 或 `ComponentB.vue` 文件中：

```javascript
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```

现在 `ComponentA` 和 `ComponentC` 都可以在 `ComponentB` 的模板中使用了。