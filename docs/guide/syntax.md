# 模板语法

VueEgret 使用了基于 XML 的模板语法，允许开发者声明式地将 DisplayObject 绑定至底层 VueEgret 实例的数据。

在底层的实现上，VueEgret 将模板编译成虚拟 DOM 渲染函数。结合响应系统，VueEgret 能够智能地计算出最少需要重新渲染多少组件，并把 DisplayObject 操作次数减到最少。

当然，你也可以不用模板，**直接写渲染 (render) 函数**，使用可选的 JSX 语法。

## 插值

### 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：

```html
<TextField>Message: {{ msg }}</TextField>
```

Mustache 标签将会被替代为对应数据对象上 msg property 的值。无论何时，绑定的数据对象上 msg property 发生了改变，插值处的内容都会更新。

注：模板中的文件节点，都会当做模板的 text attribute 进行处理，只是语法上的不同，上面的例子等价于

```html
<TextField :text="'Message:' + msg"></TextField>
```

### Attribute

Mustache 语法不能作用在 HTML attribute 上，遇到这种情况应该使用 `v-bind` 指令：

```html
<TextField v-bind:x="10" v-bind:y="20"></TextField>
```

对于布尔 attribute (它们只要存在就意味着值为 true)。

### 使用 JavaScript 表达式

迄今为止，在我们的模板中，我们一直都只绑定简单的 property 键值。但实际上，对于所有的数据绑定，VueEgret 都提供了完全的 JavaScript 表达式支持。

```html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<TextField v-bind:text="'Message:' + msg"></TextField>
```

这些表达式会在所属 VueEgret 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含单个表达式，所以下面的例子都不会生效。

```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

> 模板表达式都被放在沙盒中，你不应该在模板表达式中试图访问用户定义的全局变量。

## 指令

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。指令 attribute 的值预期是**单个 JavaScript 表达式** (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DisplayObject。回顾我们在介绍中看到的例子：

```html
<TextField v-if="seen">现在你看到我了</TextField>
```

这里，`v-if` 指令将根据表达式 `seen` 的值的真假来插入/移除 `TextField` 对象。

### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 attribute：

```html
<TextField v-bind:text="msg"></TextField>
```

在这里 `text` 是参数，告知 `v-bind` 指令将该元素的 `text` attribute 与表达式 `msg` 的值绑定。

另一个例子是 `v-on` 指令，它用于监听事件：

```html
<TextField v-on:touchTap="doSomething">...</TextField>
```

在这里参数是监听的事件名。我们也会更详细地讨论事件处理。

### 动态参数

使用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<TextField v-bind:[attributeName]="msg"> ... </TextField>
```

这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。例如，如果你的 VueEgret 实例有一个 `data` property `attributeName`，其值为 `"text"`，那么这个绑定将等价于 `v-bind:text`。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<Sprite v-on:[eventName]="doSomething">...</Sprite>
```

在这个示例中，当 `eventName` 的值为 `"touchTap"` 时，`v-on:[eventName]` 将等价于 `v-on:touchTap`。

### 修饰符

修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`：

```html
<Sprite v-on:touchTap.prevent="doSomething">...</Sprite>
```

在接下来对 `v-on` 和 `v-for` 等功能的探索中，你会看到修饰符的其它例子。

## 缩写

`v-` 前缀作为一种视觉提示，用来识别模板中 VueEgret 特定的 attribute。当你在使用 VueEgret 为现有标签添加动态行为 (dynamic behavior) 时，`v-` 前缀很有帮助，然而，对于一些频繁用到的指令来说，就会感到使用繁琐。因此，Vue 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：

### `v-bind` 缩写

```html
<!-- 完整语法 -->
<TextField v-bind:text="msg">...</TextField>

<!-- 缩写 -->
<TextField :text="msg">...</TextField>

<!-- 动态参数的缩写 -->
<TextField :[key]="msg"> ... </TextField>
```

### `v-on` 缩写

```html
<!-- 完整语法 -->
<Sprite v-on:touchTap="doSomething">...</Sprite>

<!-- 缩写 -->
<Sprite @touchTap="doSomething">...</Sprite>

<!-- 动态参数的缩写 -->
<Sprite @[event]="doSomething"> ... </Sprite>
```

缩写语法是完全可选的，随着你更深入地了解它们的作用，你会庆幸拥有它们。
