# Prop

> 该页面假设你已经阅读过了[组件基础](./components.html)。如果你还对组件不太了解，推荐你先阅读它。


## Prop 类型

到这里，我们只看到了以字符串数组形式列出的 prop：

```javascript
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些 property 的名称和值分别是 prop 各自的名称和类型：

```javascript
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

这不仅为你的组件提供了文档，还会在它们遇到错误的类型时从浏览器的 JavaScript 控制台提示用户。你会在这个页面接下来的部分看到**类型检查和其它 prop 验证**。

## 传递静态或动态 Prop

像这样，你已经知道了可以像这样给 prop 传入一个静态的值：

```html
<MyLabel title="My journey with Vue"></MyLabel>
```

你也知道 prop 可以通过 `v-bind` 动态赋值，例如：

```html
<!-- 动态赋予一个变量的值 -->
<MyLabel v-bind:title="post.title"></MyLabel>

<!-- 动态赋予一个复杂表达式的值 -->
<MyLabel
  v-bind:title="post.title + ' by ' + post.author.name"
></MyLabel>
```

在上述两个示例中，我们传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。

### 传入一个数字

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 VueEgret -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<MyLabel v-bind:likes="42"></MyLabel>

<!-- 用一个变量进行动态赋值。-->
<MyLabel v-bind:likes="post.likes"></MyLabel>
```

### 传入一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<MyLabel isPublished></MyLabel>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 VueEgret -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<MyLabel v-bind:isPublished="false"></MyLabel>

<!-- 用一个变量进行动态赋值。-->
<MyLabel v-bind:isPublished="post.isPublished"></MyLabel>
```

### 传入一个数组

```html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 VueEgret -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<MyLabel v-bind:commentIds="[234, 266, 273]"></MyLabel>

<!-- 用一个变量进行动态赋值。-->
<MyLabel v-bind:commentIds="post.commentIds"></MyLabel>
```

### 传入一个对象

```html
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 VueEgret -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<MyLabel
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></MyLabel>

<!-- 用一个变量进行动态赋值。-->
<MyLabel v-bind:author="post.author"></MyLabel>
```

### 传入一个对象的所有 property

如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:propName`)。例如，对于一个给定的对象 post：

```javascript
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<MyLabel v-bind="post"></MyLabel>
```

等价于：

```html
<MyLabel
  v-bind:id="post.id"
  v-bind:title="post.title"
></MyLabel>
```

## 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，VueEgret 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用**。在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：

```javascript
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. **这个 prop 以一种原始的值传入且需要进行转换**。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

## Prop 验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 VueEgret 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```javascript
VueEgret.component('MyComponent', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) VueEgret 将会产生一个控制台的警告。

> 注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。

### 类型检查

`type` 可以是下列原生构造函数中的一个：

* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol

额外的，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```javascript
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```javascript
VueEgret.component('MyLabel', {
  props: {
    author: Person
  }
})
```

来验证 `author` prop 的值是否是通过 `new Person` 创建的。

## 非 Prop 的 Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

因为显式定义的 prop 适用于向一个子组件传入信息，然而组件库的作者并不总能预见组件会被用于怎样的场景。这也是为什么组件可以接受任意的 attribute，而这些 attribute 会被添加到这个组件的根元素上。

例如，想象一下你使用了一个 \<MyLabel> 组件，需要直接使用`TextField`的属性，又不想一一声明所有字段，我们可以将这个 attribute 添加到你的组件实例上：

```html
<MyLabel x="30"></MyLabel>
```

则这个 `x="30"` attribute 就会自动添加到TextField属性上。

### 禁用 Attribute 继承

如果你**不**希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

```javascript
VueEgert.component('MyComponent', {
  inheritAttrs: false,
  // ...
})
```

这尤其适合配合实例的 `$attrs` property 使用，该 property 包含了传递给一个组件的 attribute 名和 attribute 值，例如：

```javascript
{
  textColor: 0xFF0000,
  size: 30
}
```

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些 attribute 会被赋予哪个元素。在撰写基础组件的时候是常会用到的：

```javascript
VueEgret.component('MyLabel', {
  inheritAttrs: false,
  props: ['title'],
  template: `
    <Sprite>
      <TextField v-bind="$attrs">{{title}}</TextField>
    </Sprite>
  `
})
```

这个模式允许你在使用基础组件时更像是直接使用显示对象的属性，而不会担心哪个属性是真正的根的属性：

```html
<MyLabel
  title="Hello VueEgret!"
  :textColor="0xFF0000"
  :size="30"
></MyLabel>
```