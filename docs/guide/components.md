# 组件基础

## 基本示例

这里有一个 VueEgret 组件的示例：

```javascript
// 定义一个名为 MyLabe 的新组件
VueEgret.component('MyLabel', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<TextField touchEnabled="true" v-on:touchTap="count++">You clicked me {{ count }} times.</TextField>'
})
```

组件是可复用的 VueEgret 实例，且带有一个名字：在这个例子中是 \<MyLabel>。我们可以在一个通过 VueEgret 实例中，把这个组件作为自定义元素来使用：

```html
<Sprite>
    <MyLabel></MyLabel>
</Sprite>
```

::: demo:hideCode=true

```javascript
VueEgret.component('MyLabel', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<TextField touchEnabled="true" v-on:touchTap="count++">You clicked me {{ count }} times.</TextField>'
})

var Main = VueEgret.classMain({
  data: {
    count: 0,
  },
  methods: {
    onTextClick() {
      this.count++;
    },
  },
  template: `<Sprite>
    <MyLabel></MyLabel>
  </Sprite>`,
});
```

:::

因为组件是可复用的 VueEgret 实例，所以它们与 VueEgret.classMain 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。

## 组件的复用

你可以将组件进行任意次数的复用：

```html
<Sprite>
    <MyLabel></MyLabel>
    <MyLabel></MyLabel>
    <MyLabel></MyLabel>
</Sprite>
```

::: demo:hideCode=true

```javascript
VueEgret.component('MyLabel', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<TextField v-bind="$attrs" touchEnabled="true" v-on:touchTap="count++">You clicked me {{ count }} times.</TextField>'
})

var Main = VueEgret.classMain({
  data: {
    count: 0,
  },
  methods: {
    onTextClick() {
      this.count++;
    },
  },
  template: `<Sprite>
    <MyLabel y="0"></MyLabel>
    <MyLabel y="30"></MyLabel>
    <MyLabel y="60"></MyLabel>
  </Sprite>`,
});
```

:::

注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新实例被创建。

### `data` 必须是一个函数

当我们定义这个 \<MyLabel> 组件时，你可能会发现它的 `data` 并不是像这样直接提供一个对象：

```javascript
data: {
  count: 0
}
```

取而代之的是，**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

```javascript
data: function () {
  return {
    count: 0
  }
}
```

如果 VueEgret 没有这条规则，点击一个按钮就可能会像如下代码一样影响到其它所有实例：

::: demo:hideCode=true

```javascript
VueEgret.component('MyLabel', {
  data: {
    count: 0
  },
  template: '<TextField v-bind="$attrs" touchEnabled="true" v-on:touchTap="count++">You clicked me {{ count }} times.</TextField>'
})

var Main = VueEgret.classMain({
  data: {
    count: 0,
  },
  methods: {
    onTextClick() {
      this.count++;
    },
  },
  template: `<Sprite>
    <MyLabel y="0"></MyLabel>
    <MyLabel y="30"></MyLabel>
    <MyLabel y="60"></MyLabel>
  </Sprite>`,
});
```

:::

## 组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织：

![components](./images/components.png)

为了能在模板中使用，这些组件必须先注册以便 VueEgret 能够识别。这里有两种组件的注册类型：**全局注册**和**局部注册**。至此，我们的组件都只是通过 `VueEgret.component` 全局注册的：

```javascript
VueEgret.component('my-component-name', {
  // ... options ...
})
```

全局注册的组件可以用在其被注册之后的任何新创建的 VueEgret 实例，也包括其组件树中的所有子组件的模板中。

## 通过 Prop 向子组件传递数据

早些时候，我们提到了创建一个文本组件的事情。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也正是 prop 的由来。

Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。为了给博文组件传递一个标题，我们可以用一个 `props` 选项将其包含在该组件可接受的 prop 列表中：

```javascript
VueEgret.component('MyLabel', {
  props: ['title'],
  template: '<TextField>{{ title }}</TextField>'
})
```

一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 `data` 中的值一样。

```javascript
<MyLabel title="My journey with VueEgret"></MyLabel>
<MyLabel title="Blogging with VueEgret"></MyLabel>
<MyLabel title="VueEgret Vue is so fun"></MyLabel>
```

你也可以使用 `v-for` 来实现：

```html
<MyLabel 
    v-for="post in posts"
    v-bind:key="post.id"
    v-bind:title="post.title"
></MyLabel>
```

```javascript
{
  data: {
    posts: [
      { id: 1, title: 'My journey with VueEgret' },
      { id: 2, title: 'Blogging with VueEgret' },
      { id: 3, title: 'Why VueEgret is so fun' }
    ]
  }
}
```

## 监听子组件事件

在我们开发 \<MyLabel> 组件时，可能需要我们和父级组件进行沟通。例如我们可能通过点击来修改文本的字体大小。

```javascript
var Main = VueEgret.classMain({
  data: {
    posts: [/* ... */],
    postFontSize: 14
  }
})
```

```html
<MyLabel 
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:fontSize="postFontSize + 'px'"
></MyLabel>
```

现在我们在自定义组件中添加事件，通过子组件调用内建的 `$emit` 方法并传入事件名称来触发一个事件：：

```javascript
VueEgret.component('MyLabel', {
  props: ['title', 'fontSize'],
  template: `<TextField 
    touchEnabled="true" 
    v-bind:fontSize="fontSize" 
    v-on:touchTap="$emit('enlarge-text')">{{ title }}
  </TextField>`
})
```

父级组件通过 VueEgret 实例内部的事件机制，使得父级组件可以像处理 native 事件一样通过 `v-on` 监听子组件实例的任意事件：

```html
<MyLabel
  ...
  v-on:enlarge-text="postFontSize += 1"
></MyLabel>
```

有了这个 `v-on:enlarge-text="postFontSize += 1"` 监听器，父级组件就会接收该事件并更新 postFontSize 的值。

::: demo:hideCode=true

```javascript
VueEgret.component('MyLabel', {
  props: ['title', 'fontSize'],
  template: `<TextField 
    touchEnabled="true" 
    v-bind:y="$attrs.y"
    v-bind:size="fontSize" 
    v-on:touchTap="$emit('enlarge-text')"
  >{{ title }}</TextField>`
})
var Main = VueEgret.classMain({
  data: {
    posts: [
      { id: 1, title: 'My journey with VueEgret' },
      { id: 2, title: 'Blogging with VueEgret' },
      { id: 3, title: 'Why VueEgret is so fun' }
    ],
    postFontSize: 28
  },
  template: `<Sprite>
    <MyLabel 
      v-for="post in posts"
      v-bind:y="(post.id-1)*30"
      v-bind:key="post.id"
      v-bind:title="post.title"
      v-bind:fontSize="postFontSize"
      v-on:enlarge-text="postFontSize += 1"
    ></MyLabel>
  </Sprite>`
})

```

:::

### 使用事件抛出一个值

有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 \<MyLabel> 组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值：

```html
<TextField 
  ...
  v-on:touchTap="$emit('enlarge-text', 2)"
></TextField>
```

然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值：

```html
<MyLabel
  ...
  v-on:enlarge-text="postFontSize += $event"
></MyLabel>

或者，如果这个事件处理函数是一个方法：

```html
<MyLabel
  ...
  v-on:enlarge-text="onEnlargeText"
></MyLabel>
```

那么这个值将会作为第一个参数传入这个方法：

```javascript
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```