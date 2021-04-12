# 条件渲染

## `v-if`

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

```html
<TextField v-if="awesome">VueEgret is awesome!</TextField>
```

### `v-else`

你可以使用 `v-else` 指令来表示 `v-if` 的“else 块”：

```html
<TextField v-if="Math.random() > 0.5">Now you see me</TextField>
<TextField v-else>Now you don't</TextField>
```

`v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

### `v-else-if`

`v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，可以连续使用：

```html
<TextField v-if="type === 'A'">A</TextField>
<TextField v-else-if="type === 'B'">B</TextField>
<TextField v-else-if="type === 'C'">C</TextField>
<TextField v-else>Not A/B/C</TextField>
```

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

## `v-if` vs `:visible`

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`:visible` 就简单得多——不管初始条件是什么，显示对象总是会被渲染，并且只是更改显示对象的 [visible 值](http://developer.egret.com/cn/apidoc/index/name/egret.DisplayObject#visible)。

一般来说，`v-if` 有更高的切换开销，而 `:visible` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `:visible` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## `v-if` 与 `v-for` 一起使用

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。
