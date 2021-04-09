# 自定义指令

## 简介

VueEgret 是允许注册自定义指令。有的情况下，你仍然需要对显示对象进行底层操作，这时候就会用到自定义指令。举个demo的例子，如下：

```javascript
// 注册一个全局自定义指令 `v-demo`
VueEgret.directive('demo', {
  // 当被绑定的显示对象加载到舞台中时……
  inserted: function (el) {
    el.textColor = 0x00FF00;
    el.text = 'Hello VueEgret!';
  },
})
```

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```javascript
directives: {
  demo: {
    // 指令的定义
    inserted: function (el) {
        el.textColor = 0x00FF00;
        el.text = 'Hello VueEgret!';
    },
  }
}
```

然后你可以在模板中任何元素上使用新的 `v-demo` property，如下：

```html
<TextField v-demo></TextField>
```

::: demo:hideCode=true

```javascript
// 注册一个全局自定义指令 `v-demo`
VueEgret.directive('demo', {
  // 当被绑定的显示对象加载到舞台中时……
  inserted: function (el, binding) {
    el.textColor = 0x00FF00;
    el.text = 'Hello VueEgret!';
  },
})

var Main = VueEgret.classMain({
    template: `<TextField v-demo></TextField>`
})
```

:::

## 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 **VNode 及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

接下来我们来看一下钩子函数的参数 (即 `el`、`binding`、`vnode` 和 `oldVnode`)。

## 钩子函数参数

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- `binding`：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：VueEgret 编译生成的虚拟节点。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

> 除了 el 之外，其它参数都应该是只读的，切勿进行修改。

这是一个使用了这些 property 的自定义钩子样例：

```html
<TextField v-demo:foo.a.b="message"></TextField>
```

::: demo

```javascript
VueEgret.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.text =
      'name: '       + s(binding.name) + '\n' +
      'value: '      + s(binding.value) + '\n' +
      'expression: ' + s(binding.expression) + '\n' +
      'argument: '   + s(binding.arg) + '\n' +
      'modifiers: '  + s(binding.modifiers) + '\n' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

var Main = VueEgret.classMain({
    data: {
        message: 'hello!'
    },
    template: `<TextField v-demo:foo.a.b="message" size="24"></TextField>`
})
```

:::

## 动态指令参数

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。

例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令：

```html
<TextField v-pin="200">Stick me 200px from the top of the page</TextField>
```

```javascript
VueEgret.directive('pin', {
  bind: function (el, binding, vnode) {
    el.x = binding.value
  }
})
```

这会把该元素固定在距离页面顶部 200 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。

::: demo

```javascript
VueEgret.directive('pin', {
  bind: function (el, binding, vnode) {
    var p = (binding.arg == 'left' ? 'x' : 'y')
    el[p] = binding.value
  }
})

var Main = VueEgret.classMain({
    data: function () {
        return {
            direction: 'left'
        }
    },
    template: `<TextField v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</TextField>`
})
```

:::

这样这个自定义指令现在的灵活性就足以支持一些不同的用例了。

## 函数简写

在很多时候，你可能想在 bind 和 update 时触发相同行为，而不关心其它的钩子。比如这样写：

```javascript
VueEgret.directive('color-swatch', function (el, binding) {
  el.textColor = binding.value
})
```

## 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```html
<TextField v-demo="{ textColor: 'white', text: 'hello!' }"></TextField>
```

```javascript
VueEgret.directive('demo', function (el, binding) {
  console.log(binding.value.textColor) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```
