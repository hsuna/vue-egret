# 列表渲染

## 用 `v-for` 把一个数组对应为一组元素

我们可以用 `v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    items: [
      { top: 0, message: 'Foo' },
      { top: 30, message: 'Bar' },
    ],
  },
  template: `<Sprite>
    <TextField v-for="item in items" :y="item.top">{{ item.message }}</TextField>
  </Sprite>`,
});
```

:::

在 `v-for` 块中，我们可以访问所有父作用域的 property。`v-for` 还支持一个可选的第二个参数，即当前项的索引。

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }],
  },
  template: `<Sprite>
    <TextField v-for="(item, index) in items" :y="30*index">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
    </TextField>
  </Sprite>`,
});
```

:::

你也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法：

```html
<TextField v-for="item of items"></TextField>
```

## 在 `v-for` 里使用对象

你也可以用 `v-for` 来遍历一个对象的 property。

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10',
    },
  },
  template: `<Sprite>
    <TextField v-for="(value, key, index) in object" :y="30*index">{{ value }}</TextField>
  </Sprite>`,
});
```

:::

你也可以提供第二个的参数为 property 名称 (也就是键名)：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10',
    },
  },
  template: `<Sprite>
    <TextField v-for="(value, name, index) in object" :y="30*index">{{ name }}: {{ value }}</TextField>
  </Sprite>`,
});
```

:::

还可以用第三个参数作为索引：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10',
    },
  },
  template: `<Sprite>
    <TextField v-for="(value, name, index) in object" :y="30*index">{{ index }}. {{ name }}: {{ value }}</TextField>
  </Sprite>`,
});
```

:::

> 在遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 JavaScript 引擎下都一致。

## 维护状态

当 VueEgret 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，VueEgret 将不会移动显示对象来匹配数据项的顺序，而是就地更新每个对象，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时对象状态的列表渲染输出。

为了给 VueEgret 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```html
<TextField v-for="item in items" v-bind:key="item.id"></TextField>
```

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的显示对象非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 VueEgret 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联。后面我们将在指南中看到，它还具有其它用途。

> 不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。

## 数组更新检测

### 变更方法

VueEgret 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

你可以对前面例子的 `items` 数组尝试调用变更方法。比如 `this.items.push({ message: 'Baz' })`。

### 替换数组

变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而**总是返回一个新数组**。当使用非变更方法时，可以用新数组替换旧数组：

```javascript
this.items = this.items.filter(function (item) {
  return item.message.match(/Foo/);
});
```

你可能认为这将导致 VueEgret 丢弃现有对象并重新渲染整个列表。幸运的是，事实并非如此。VueEgret 为了使得显示对象得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 注意事项

由于 JavaScript 的限制，VueEgert 不能检测数组和对象的变化。

## 显示过滤/排序后的结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据。在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

例如：

```html
<TextField v-for="n in evenNumbers">{{ n }}</TextField>
```

```javascript
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

在计算属性不适用的情况下 (例如，在嵌套 `v-for` 循环中) 你可以使用一个方法：

```html
<Sprite v-for="set in sets">
  <TextField v-for="n in even(set)">{{ n }}</TextField>
</Sprite>
```

```javascript
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## 在 `v-for` 里使用值范围

`v-for` 也可以接受整数。在这种情况下，它会把模板重复对应次数。

::: demo

```javascript
var Main = VueEgret.classMain({
  template: `<Sprite>
        <TextField v-for="n in 10" :x="30*n-30">{{ n }}</TextField>
    </Sprite>`,
});
```

:::

## 在组件上使用 v-for

在自定义组件上，你可以像在任何普通元素上一样使用 `v-for`。

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

然而，任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。为了把迭代数据传递到组件里，我们要使用 prop：

```html
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

不自动将 `item` 注入到组件里的原因是，这会使得组件与 `v-for` 的运作紧密耦合。明确组件数据的来源能够使组件在其他场合重复使用。
