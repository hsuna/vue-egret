# 计算属性和侦听器

## 计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<template>
  <TextField> {{ message.split('').reverse().join('') }} </TextField>
</template>
```

在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。当你想要在模板中的多处包含此翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。

### 基础例子

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    message: 'Hello',
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('');
    },
  },
  template: `<Sprite>
    <TextField :y="0">Original message: "{{ message }}"</TextField>
    <TextField :y="30">Reversed message: "{{ reversedMessage }}"</TextField>
  </Sprite>`,
});
```

:::

这里我们声明了一个计算属性 `reversedMessage`。我们提供的函数将用作 property `reversedMessage` 的 getter 函数：

```javascript
console.log(this.reversedMessage); // => 'olleH'
this.message = 'Goodbye';
console.log(this.reversedMessage); // => 'eybdooG'
```

你可以像绑定普通 property 一样在模板中绑定计算属性。 VueEgret 知道 `reversedMessage` 依赖于 `message`，因此当 `message` 发生改变时，所有依赖 `reversedMessage` 的绑定也会更新。

### 计算属性缓存 vs 方法

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html

```

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    message: 'Hello',
  },
  methods: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('');
    },
  },
  template: `<TextField>Reversed message: "{{ reversedMessage() }}"</TextField>`,
});
```

:::

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```javascript
computed: {
  now: function () {
    return Date.now()
  }
}
```

相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。

### 计算属性 vs 侦听属性

VueEgret 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调。细想一下这个例子：

```javascript
var Main = VueEgret.classMain({
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
  template: `<TextField>{{ fullName }}"</TextField>`,
});
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：

```javascript
var Main = VueEgret.classMain({
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
  template: `<TextField>{{ fullName }}"</TextField>`,
});
```

好得多了，不是吗？

### 计算属性的 setter

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```javascript
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 `this.fullName = 'John Doe'` 时，setter 会被调用，`this.firstName` 和 `this.lastName` 也会相应地被更新。

## 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 VueEgret 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    count: 0,
    lock: false,
    message: 'Please click!!!'
  },
  watch: {
    count: function (newVal, val) {
      this.message = 'Click times is ' + this.count;
      this.lock = true;
      setTimeout((function(){
        this.lock = false;
      }).bind(this), 1000)
    }
  },
  methods: {
    onTextClick: function() {
      if(this.lock) return;
      this.count++;
    }
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
    <TextField>{{message}}</TextField>
  </Sprite>`,
});
```

:::

在这个示例中，使用 `watch` 选项监听点击次数，限制我们执行该操作的频率。这些都是计算属性无法做到的。

除了 `watch` 选项之外，您还可以使用命令式的 this.$watch API。
