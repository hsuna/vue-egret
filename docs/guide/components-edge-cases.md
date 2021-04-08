# 处理边界情况

> 该页面假设你已经阅读过了[组件基础](./components.html)。如果你还对组件不太了解，推荐你先阅读它。

## 访问元素 & 组件

在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作显示对象。不过也确实在一些情况下做这些事情是合适的。

### 访问根实例

在每个 VueEgret 实例的子组件中，其根实例可以通过 $root property 进行访问。例如，在这个根实例中：

```javascript
// VueEgret实例
VueEgret.classMain({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
```

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。

```javascript
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

### 访问父级组件实例

和 `$root` 类似，`$parent` property 可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式。

> 在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。

### 访问子组件实例或子元素

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用。例如：

```html
<MyLabel ref="myLabel"></MyLabel>
```

现在在你已经定义了这个 `ref` 的组件里，你可以使用：

```javascript
this.$refs.myLabel
```

来访问这个 `<MyLabel>` 实例，以便不时之需。比如程序化地从一个父级组件聚焦这个输入框。在刚才那个例子中，该 `<MyLabel>` 组件也可以使用一个类似的 `ref` 提供对内部这个指定元素的访问，例如：

```html
<TextField ref="textField"></TextField>
```

甚至可以通过其父级组件定义方法：

```javascript
methods: {
  // 用来从父级组件聚焦输入框
  focus: function () {
    this.$refs.textField.setFocus()
  }
}
```

这样就允许父级组件通过下面的代码聚焦 `<MyLabel>` 里的输入框：

```javascript
this.$refs.usernameInput.focus()
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

> `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。