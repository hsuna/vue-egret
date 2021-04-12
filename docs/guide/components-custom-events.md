# 自定义事件

> 该页面假设你已经阅读过了[组件基础](./components.html)。如果你还对组件不太了解，推荐你先阅读它。

## 事件名

推荐你始终使用 camelCase 的事件名。

## 将原生事件绑定到组件

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```html
<MyLabel v-on:change.native="onCange"></MyLabel>
```

在有的时候这是很有用的，不过在你尝试监听一个类似 \<TextField> 的非常特定的元素时，这并不是个好主意。比如上述 \<MyLabel> 组件可能做了如下重构，所以根元素实际上是一个 \<Sprite> 元素：

```html
<Sprite>
  
  <TextField
    v-bind="$attrs"
    v-on:change="$emit('change', $event.target.value)"
  >
    {{ title }}
  </TextField>
</Sprite>
```

这时，父级的 `.native` 监听器将静默失败。它不会产生任何报错，但是 onChange 处理函数不会如你预期地被调用。

为了解决这个问题，VueEgret 提供了一个 `$listeners` property，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：

```javascript
{
  touchTap: function (event) { /* ... */ }
  change: function (value) { /* ... */ },
}
```

有了这个 `$listeners` property，你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素：

```javascript
VueEgret.component('MyLabel', {
  inheritAttrs: false,
  props: ['title'],
  template: `
    <Sprite>
      <TextField 
        v-bind="$attrs"
        v-on="inputListeners"
      >
        {{title}}
      </TextField>
    </Sprite>
  `
})
```

现在 \<MyLabel> 组件是一个**完全透明的包裹器**了，也就是说它可以完全像一个普通的 \<TextField> 元素一样使用了：所有跟它相同的 attribute 和监听器都可以工作，不必再使用 `.native` 监听器。

## .sync 修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。

这也是为什么我们推荐以 update:myPropName 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```javascript
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```html
<MyLabel
  v-bind:title="data.title"
  v-on:update:title="data.title = $event"
></MyLabel>
```

为了方便起见，我们为这种模式提供一个缩写，即 `·sync` 修饰符：

```html
<MyLabel v-bind:title.sync="data.title"></MyLabel>
```

> 注意带有 `.sync` 修饰符的 `v-bind` 不能和表达式一起使用 (例如 `v-bind:title.sync=”data.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```html
<MyLabel v-bind.sync="data"></MyLabel>
```

这样会把 `data` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

> 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。