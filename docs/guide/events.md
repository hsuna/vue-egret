# 事件处理

可以用 `v-on` 指令监听事件，并在触发时运行一些 `JavaScript` 代码。

示例：

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    counter: 0,
  },
  template: `<Sprite>
    <TextField touchEnabled="true" @touchTap="counter += 1">
        The text above has been clicked {{counter}} times.
    </TextField>
  </Sprite>`
});
```

:::

## 事件处理方法

然而许多事件处理逻辑会更为复杂，所以直接把 JavaScript 代码写在 `v-on` 指令中是不可行的。因此 `v-on` 还可以接收一个需要调用的方法名称。

::: demo

```javascript
var Main = VueEgret.classMain({
  data: {
    counter: 0,
  },
  methods: {
    onTextClick() {
      this.counter++;
    },
  },
  template: `<Sprite>
    <TextField touchEnabled="true" @touchTap="onTextClick">
        The text above has been clicked {{counter}} times.
    </TextField>
  </Sprite>`
});
```

:::

## 内联处理器中的方法

除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法：

::: demo

```javascript
var Main = VueEgret.classMain({
  methods: {
    say: function (message) {
      alert(message)
    }
  },
  template: `<Sprite>
    <TextField x="0" touchEnabled @touchTap="say('hi')">Say hi</button>
    <TextField x="100" touchEnabled @touchTap="say('what')">Say what</button>
  </Sprite>`
});
```

:::

有时也需要在内联语句处理器中访问原生事件。可以用特殊变量 $event 把它传入方法：

```html
<TextField @touchTap="warn('Form cannot be submitted yet.', $event)">Say hi</TextField>
```

```javascript
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

## 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，VueEgret 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

* .stop
* .prevent
* .capture
* .self
* .once

```html
<!-- 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。 -->
<!-- http://developer.egret.com/cn/apidoc/index/name/egret.Event#stopPropagation -->
<Sprite v-on:touchTap.stop="doThis"></Sprite>

<!-- 如果可以取消事件的默认行为，则取消该行为。 -->
<!-- http://developer.egret.com/cn/apidoc/index/name/egret.Event#preventDefault -->
<Sprite v-on:touchTap.prevent="onSubmit"></Sprite>

<!-- 修饰符可以串联 -->
<Sprite v-on:touchTap.stop.prevent="doThat"></Sprite>

<!-- 可以只有修饰符 -->
<Sprite v-on:touchTap.prevent></Sprite>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<Sprite v-on:touchTap.capture="doThis">...</Sprite>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<Sprite v-on:touchTap.self="doThat">...</Sprite>

<!-- 点击事件将只会触发一次 -->
<Sprite v-on:touchTap.once="doThis"></Sprite>
```

> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:touchTap.prevent.self` 会阻止所有的点击，而 `v-on:touchTap.self.prevent` 只会阻止对元素自身的点击。

## 为什么在 XML 中监听事件？

你可能注意到这种事件监听的方式违背了关注点分离 (separation of concern) 这个长期以来的优良传统。但不必担心，因为所有的 VueEgret 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难。实际上，使用 `v-on` 有几个好处：

1. 扫一眼 XML 模板便能轻松定位在 JavaScript 代码里对应的方法。

2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DisplayObject 完全解耦，更易于测试。

3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。
