---
sidebar: auto
---

# API

## 全局 API

`VueEgret` 是一个继承 `Component` 的类，它提供了多个静态属性方便外部使用。

### VueEgret

- 用法：

```javascript
var vm = new VueEgret({
  data: {
    text: 'Hello Word!!!',
  },
  methods: {
    onTextClick() {
      this.text = 'Text is Click';
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
        <TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
    </Sprite>`,
});
```

### VueEgret.classMain

`classMain` 通过传入 `options` 返回一个 `DisplayObjectContainer` 子类，提供给 `egret` 内部调用。

- 参数：
  - `{ ComponentOptions } options`
- 返回：

  - `{ Class<DisplayObjectContainer> }`

- 用法：

```javascript
var Main = VueEgret.classMain({
  data: {
    text: 'Hello Word!!!',
  },
  methods: {
    onTextClick() {
      this.text = 'Text is Click';
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
        <TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
    </Sprite>`,
});
```

### VueEgret.extend

使用基础 `VueEgret` 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

- 参数：
  - `{ ComponentOptions|ComponentClass } options`
- 返回：

  - `{ ComponentClass }`

- 用法：

```javascript
// 创建构造器
var Profile = VueEgret.extend({
  data: {
    text: 'Hello Word!!!',
  },
  methods: {
    onTextClick() {
      this.text = 'Text is Click';
    },
  },
  template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
        <TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
    </Sprite>`,
});

// 创建 Profile 实例，并添加到显示对象。
var container = new egret.DisplayObjectContainer();
new Profile().$mount(container);
```

### VueEgret.nextTick

将回调延迟到下次 `Node` 更新循环之后执行。在修改数据之后立即使用它，然后等待 `Node` 更新。

- 参数：

  - `{ Function } callback`

- 返回: `{ Promise }`

- 用法：

```javascript
VueEgret.nextTick(function () {
  // TODO;
});

VueEgret.nextTick().then(function () {
  // TODO;
});
```

> 如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。

### VueEgret.set

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 `VueEgret` 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

- 参数：

  - `{Object | Array} target`
  - `{string | number} propertyName/index`
  - `{any} value`

- 返回：

  - `{ any } value` 设置的值

- 用法：

```javascript
VueEgret.set(this.myObject, 'newProperty', 'hi');
```

> 注意对象不能是 `VueEgret` 实例，或者 `VueEgret` 实例的根数据对象。

### VueEgret.delete

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 `VueEgret` 不能检测到 property 被删除的限制，但是你应该很少会使用它。

- 参数：

  - `{Object | Array} target`
  - `{string | number} propertyName/index`

- 用法：

```javascript
VueEgret.delete(this.myObject, 'oldProperty');
```

> 目标对象不能是 `VueEgret` 实例，或者 `VueEgret` 实例的根数据对象。

### VueEgret.component

注册或获取全局组件。注册还会自动使用给定的 `name` 设置组件的名称

- 参数：
  - `{ String } name`
  - `{ ComponentOptions } options`
- 返回：

  - `{ ComponentClass }`

- 用法：

```javascript
// 注册组件，传入一个扩展过的构造器
VueEgret.component('my-component', VueEgret.extend({/* ... */}));

// 注册组件，传入一个选项对象 (自动调用 VueEgret.extend)
VueEgret.component('my-component', {/* ... */});

// 获取注册的组件 (始终返回构造器)
var MyComponent = VueEgret.component('my-component');
```

### VueEgret.directive

注册或获取全局指令。

- 参数：
  - `{ String } name`
  - `{ DirectiveOptions | DirectiveHook } definition`
- 返回：

  - `{ DirectiveOptions }`

- 用法：

```javascript
// 注册
VueEgret.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
});

// 注册 (指令函数)
VueEgret.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
});

// 获取注册的指令
var MyDirective = VueEgret.directive('my-directive');
```

### VueEgret.version

提供字符串形式的 `VueEgret` 安装版本号，你可以根据不同的版本号采取不同的策略。

- 用法：

```javascript
var version = VueEgret.version;
console.log(version);
```

## 选项 / 数据

### data

- 类型：`{ Object | Function }`

> 注：组件的定义只接受 `Function`。

- 说明：

`VueEgret` 实例的数据对象。`Vue` 将会递归将 `data` 的 `property` 转换为 `getter/setter`，从而让 `data` 的 `property` 能够响应数据变化。对象必须是纯粹的对象 (含有零个或多个的 `key/value` 对)，`egret API` 创建的原生对象，原型上的 `property` 会被忽略。

实例创建之后，可以通过 `vm.$data` 访问原始数据对象。`VueEgret` 实例也代理了 `data` 对象上所有的 `property`，因此访问 `vm.a` 等价于访问 `vm.$data.a`。

当一个组件被定义，`data` 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象。

如果需要，可以通过将 `vm.$data` 传入 `JSON.parse(JSON.stringify(...))` 得到深拷贝的原始数据对象。

- 用法：

```javascript
var vm = new VueEgret({
  data: {
    a: 1
  }
});
vm.a; // => 1
vm.$data.a === data; // => 1

// VueEgret.extend()或VueEgret.component() 中 data 必须是函数
var Component = VueEgret.extend({
  data: function () {
    return { a: 1 };
  }
});
```

### props

- 类型：`{ Array<string> | Object }`

- 说明：

`props` 可以是数组或对象，用于接收来自父组件的数据。`props` 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如设置默认值。

你可以基于对象的语法使用以下选项：

**type：** 可以是下列原生构造函数中的一种：`String、Number、Boolean、Array、Object、Date、Function、Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 `prop` 是否是给定的类型，否则抛出警告。`Prop` 类型的更多信息在此。

**default：** 为该 `prop` 指定一个默认值。如果该 `prop` 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。

- 用法：

```javascript
// 简单语法
VueEgret.component('my-component', {
  props: ['size', 'height'],
});

// 对象语法，提供默认值
VueEgret.component('my-component', {
  props: {
    // 检测类型
    height: Number,
    // 检测类型 + 默认值
    age: {
      type: Number,
      default: 0,
    },
  },
});
```

### computed

- 类型：`{ string: Function | { get: Function, set: Function } }`

- 说明：

计算属性将被混入到 `VueEgret` 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 `VueEgret` 实例。计算属性的结果会被缓存，除非依赖的响应式 `property` 变化才会重新计算。

- 用法：

```javascript
var vm = new VueEgret({
  data: {
    a: 1,
    b: 2,
  },
  computed: {
    sum: function () {
      return this.a + this.b;
    },
    plus: {
      get: function () {
        return this.a + 1;
      },
      set: function (v) {
        this.a = v - 1;
      },
    },
  },
});
vm.plus; // => 2
vm.plus = 3;
vm.a; // => 2
vm.sum; // => 4
```

### methods

- 类型：`{ [key: string]: Function }`

- 说明：

`methods` 将被混入到 `VueEgret` 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 `VueEgret` 实例。

> 注意：**不应该使用箭头函数来定义 `method` 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 `VueEgret` 实例，`this.a` 将是 `undefined`。

- 用法：

```javascript
var vm = new VueEgret({
  data: {
    a: 1
  },
  methods: {
    plus: function () {
      this.a++;
    }
  }
});
vm.plus();
vm.a; // 2
```

### watch

- 类型：`{ [key: string]: string | Function | Object | Array }`

- 说明：

一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。`VueEgret` 实例将会在实例化时调用 `$watch()`，遍历 `watch` 对象的每一个 `property`。

> 注意：不应该使用箭头函数来定义 `watcher` 函数，箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 `VueEgret` 实例。

- 用法：

```javascript
var vm = new VueEgret({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5,
      },
    },
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true,
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true,
    },
    // 你可以传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2(val, oldVal) {
        /* ... */
      },
      {
        handler: function handle3(val, oldVal) { /* ... */ },
        /* ... */
      },
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ },
  },
});
```

## 选项 / 渲染

### template

- 类型：`string`

- 说明：

一个字符串模板作为 `VueEgret` 实例的标识使用。模板将会替换挂载的显示对象类名(`egret`下的类可以省略，例如`egret.Sprite`可直接使用`Sprite`)。

> 注意：如果 `VueEgret` 选项中包含渲染函数，该模板将被忽略。

- 用法：

```javascript
var vm = new VueEgret({
  template: `<Sprite>
        <TextField touchEnabled="true" textColor="#00FFFF" x="100" y="100">123</TextField>
    </Sprite>`
});
```

### render

- 类型：`(createVNode:(tag:string, data:any, children:Array<VNode>) => VNode) => VNode`

- 说明：

字符串模板的代替方案。该渲染函数接收一个 createVNode 方法作为第一个参数用来创建 VNode。使用`render`可以减少解析`template`时花费的时间，减少运行时间。

> 注意：`VueEgret` 选项中的 `render` 函数若存在，则 `VueEgret` 构造函数不会从 `template` 选项编译渲染函数。

- 用法：

```javascript
var vm = new VueEgret({
  render: function (h) {
    return h('Sprite', [
      h('TextField', {
        attrs: {
          textColor: '#00FFFF',
          x: 100,
          y: 100,
          text: 'xxxxx',
        },
      }),
    ]);
  },
});
```

## 选项 / 生命周期钩子

> 注：所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以直接访问数据，对 `property` 和方法进行运算。这也意味着你不能使用箭头函数来定义一个生命周期方法，因为箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 `VueEgret` 实例。

### beforeCreate

- 类型：`Function`

- 说明：

在实例初始化之后，数据观测 `(data observer)` 和 `watcher` 事件配置之前被调用。

### created

- 类型：`Function`

- 说明：

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (`data observer`)，`property` 和方法的运算，`watcher` 事件回调。然而，挂载阶段还没开始，$el `property` 目前尚不可用。

### beforeMounted

- 类型：`Function`

- 说明：

在挂载开始之前被调用：相关的 `render` 函数首次被调用。

### mounted

- 类型：`Function`

- 说明：

实例被挂载后调用，可以通过 vm.$el 获取绑定的显示对象 。

注意 `mounted` 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 `mounted` 内部使用 vm.$nextTick：

```javascript
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
  })
}
```

### beforeUpdate

- 类型：`Function`

- 说明：

数据更新时调用，发生在虚拟节点进行打补丁之前。

### update

- 类型：`Function`

- 说明：

由于数据更改导致的虚拟节点重新渲染和打补丁，在这之后会调用该方法。

当这个钩子被调用时，组件显示对象已经更新，所以你现在可以执行依赖于显示对象的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用`计算属性`或 `watcher` 取而代之。

注意 updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.$nextTick：

```javascript
updated: function () {
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been re-rendered
  })
}
```

### beforeDestroy

- 类型：`Function`

- 说明：

实例销毁之前调用。在这一步，实例仍然完全可用。

### destroyed

- 类型：`Function`

- 说明：

实例销毁后调用。该钩子被调用后，对应 `VueEgret` 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

## 选项 / 资源

### components

- 类型：`Object`

- 说明：

包含 `VueEgret` 实例可用组件的哈希表。

## 实例 property

### vm.$data

- 类型：`Object`

- 说明：

`VueEgret` 实例观察的数据对象。`VueEgret` 实例代理了对其 `data` 对象 `property` 的访问。

### vm.$props

- 类型：`Object`

- 说明：

当前组件接收到的 `props` 对象。`VueEgret` 实例代理了对其 `props` 对象 `property` 的访问。

### vm.$el

- 类型：`DisplayObject`

- 说明：

`VueEgret` 实例使用的显示对象。

### vm.$options

- 类型：`Object`

- 说明：

用于当前 `VueEgret` 实例的初始化选项。需要在选项中包含自定义 `property` 时会有用处：

```javascript
var vm = new VueEgret({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption); // => 'foo'
  },
});
```

### vm.$parent

- 类型：`Component`

- 说明：

父实例，如果当前实例有的话。

### vm.$root

- 类型：`Component`

- 说明：

当前组件树的根 `VueEgret` 实例。如果当前实例没有父实例，此实例将会是其自己。

### vm.$children

- 类型：`Array<Component>`

- 说明：

当前实例的直接子组件。需要注意 `$children` 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 `$children` 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 Array 作为真正的来源。

### vm.$refs

- 类型：`{ [key: string]: string }`

- 说明：

一个对象，持有注册过 `ref attribute` 的所有显示对象和组件实例。

### vm.$attrs

- 类型：`{ [key: string]: string }`

- 说明：

一个对象，持有注册过 `ref attribute` 的所有显示对象和组件实例。

### vm.$listeners

- 类型：`{ [key: string]: Function | Array<Function> }`

- 说明：

包含了父作用域中的 (不含 `.native` 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

### vm.$stage

- 类型：`{ egret.Stage }`

- 说明：

获取舞台对象，详细看[`egret.Stage`](http://developer.egret.com/cn/apidoc/index/name/egret.Stage)

### vm.$stageWidth

- 类型：`{ number }`

- 说明：

获取舞台的当前宽度，详细看[`egret.Stage`](http://developer.egret.com/cn/apidoc/index/name/egret.Stage#stageWidth)

### vm.$stageHeight

- 类型：`{ number }`

- 说明：

获取舞台的当前高度，详细看[`egret.Stage`](http://developer.egret.com/cn/apidoc/index/name/egret.Stage#stageHeight)

## 实例方法 / 数据

### vm.$watch

- 参数：

  - `{ string | Function } expOrFn`
  - `{ Function | Object } callback`
  - `{ Object } [options]`

- 返回值：`{ Function } unwatch`

- 说明：

观察 `VueEgret` 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受简单的键路径。对于更复杂的表达式，用一个函数取代。

> 注意：在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。`VueEgret` 不会保留变更之前值的副本。

```javascript
// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) {
  // 做点什么
});

// 函数
vm.$watch(
  function () {
    // 表达式 `this.a + this.b` 每次得出一个不同的结果时
    // 处理函数都会被调用。
    // 这就像监听一个未被定义的计算属性
    return this.a + this.b;
  },
  function (newVal, oldVal) {
    // 做点什么
  },
);
```

`vm.$watch` 返回一个取消观察函数，用来停止触发回调：

```javascript
var unwatch = vm.$watch('a', cb);
// 之后取消观察
unwatch();
```

- 选项：deep

为了发现对象内部值的变化，可以在选项参数中指定 `deep: true`。注意监听数组的变更不需要这么做。

```javascript
vm.$watch('someObject', callback, {
  deep: true,
});
vm.someObject.nestedValue = 123;
// callback is fired
```

- 选项：immediate

在选项参数中指定 `immediate: true` 将立即以表达式的当前值触发回调：

```javascript
vm.$watch('a', callback, {
  immediate: true,
});
// 立即以 `a` 的当前值触发回调
```

注意在带有 `immediate` 选项时，你不能在第一次回调时取消侦听给定的 property。

```javascript
// 这会导致报错
var unwatch = vm.$watch(
  'value',
  function () {
    doSomething();
    unwatch();
  },
  { immediate: true },
);
```

如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性：

```javascript
var unwatch = vm.$watch(
  'value',
  function () {
    doSomething();
    if (unwatch) {
      unwatch();
    }
  },
  { immediate: true },
);
```

### vm.$set

这是全局 `VueEgret.set` 的别名。

- 参数：

  - `{ Object | Array } target`
  - `{ string | number } propertyName/index`
  - `{ any } value`

- 返回：

  - `{ any } value` 设置的值

- 用法：

```javascript
vm.$set(vm.myObject, 'newProperty', 'hi');
```

### vm.$delete

这是全局 `VueEgret.delete` 的别名。

- 参数：

  - `{ Object | Array } target`
  - `{ string | number } propertyName/index`

- 用法：

```javascript
vm.$delete(vm.myObject, 'oldProperty');
```

## 实例方法 / 事件

### vm.$on

监听当前实例上的自定义事件。事件可以由 `vm.$emit` 触发。回调函数会接收所有传入事件触发函数的额外参数。

- 参数：

  - `{ string | Array<string> } event`
  - `{ Function } callback`

- 用法：

```javascript
vm.$on('test', function (msg) {
  console.log(msg);
});
vm.$emit('test', 'hi');
// => "hi"
```

### vm.$once

监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

- 参数：

  - `{ string } event`
  - `{ Function } callback`

- 用法：

```javascript
vm.$once('test', function (msg) {
  console.log(msg);
});
vm.$emit('test', 'hi');
// => "hi"
vm.$emit('test', 'hi');
// => 不响应
```

### vm.$off

移除自定义事件监听器。

1. 如果没有提供参数，则移除所有的事件监听器；

2. 如果只提供了事件，则移除该事件所有的监听器；

3. 如果同时提供了事件与回调，则只移除这个回调的监听器。

- 参数：

  - `{ string | Array<string> } event`
  - `{ Function } callback`

- 用法：

```javascript
let handler = function (msg) {
  console.log(msg);
};
vm.$on('test', handler);
vm.$emit('test', 'hi');
// => "hi"
vm.$off('test', handler);
vm.$emit('test', 'hi');
// => 不响应
```

### vm.$emit

触发当前实例上的事件。附加参数都会传给监听器回调。

- 参数：

  - `{ string } eventName`
  - `[...args]`

- 用法：

```javascript
vm.$emit('test', 'hi');
vm.$emit('test', 'hi', 'hi2'); // 多个参数
```

## 实例方法 / 生命周期

### vm.$mount

`VueEgret` 实例化后是处于“未挂载”状态，需要使用 vm.$mount() 手动地挂载一个未挂载的实例。

这个方法返回实例自身，因而可以链式调用其它实例方法。

- 参数：
  - `{ egret.DisplayObjectContainer } parent` 挂载对象
- 返回：

  - `{ Component }` vm 实例自身

- 用法：

```javascript
var MyComponent = VueEgret.extend({
  template: `<TextField textColor="#00FFFF" x="11" y="12">test</TextField>`,
});

var container = new egret.DisplayObjectContainer();
// 创建并挂载到 container
new MyComponent().$mount(container);

// 或者
var component = new MyComponent().$mount();
container.addChild(component.$el);
```

### vm.$forceUpdate

迫使 `VueEgret` 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

- 用法：

```javascript
vm.$forceUpdate();
```

### vm.$nextTick

将回调延迟到下次 `Node` 更新循环之后执行。在修改数据之后立即使用它，然后等待 `Node` 更新。

- 参数：

  - `{ Function } callback`

- 返回: `{ Promise }`

- 用法：

```javascript
vm.$nextTick(function () {
  // TODO;
});

vm.$nextTick().then(function () {
  // TODO;
});
```

> 如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。

### vm.$destroy()

完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

触发 `beforeDestroy` 和 `destroyed` 的钩子。

- 用法：

```javascript
vm.$destroy();
```

> 在大多数场景中你不应该调用这个方法。最好使用 `v-if` 和 `v-for` 指令以数据驱动的方式控制子组件的生命周期。

## 实例方法/功能

### vm.$tween

Tween 缓动动画，详细见[`egret.Tween`](http://developer.egret.com/cn/apidoc/index/name/egret.Tween)，返回一个 `Promise`

- 参数：

  - `{ Array<TweenData> } params` 运动参数
  - `{ Component | egret.DisplayObject } target` 运动对象，默认是实例本身

- 返回: `{ Promise<egret.Tween> }`

- 用法：

TweenData 主要有`set`，`to`，`wait`三种动作：

- set：将指定对象的属性修改为指定的值，详细见[`egret.tween.Set`](http://developer.egret.com/cn/apidoc/index/name/egret.tween.Set)
- to: 根据时间，缓动的将指定对象的属性修改为指定值，详细见[`egret.tween.To`](http://developer.egret.com/cn/apidoc/index/name/egret.tween.To)
- wait: 等待指定毫秒后执行下一个动画，详细见[`egret.tween.Wait`](http://developer.egret.com/cn/apidoc/index/name/egret.tween.Wait)

```javascript
/* 传入ref name */
vm.$tween([
  ['set', { x: 100 }],
  ['to', { value: 100 }, 3000, egret.Ease.quadOut],
  ['wait', 1000],
]).then(() => {
  // 动作执行完成
});
```

### vm.$displayObject

根据传入的值获取实际的显示对象，如果传入的是个字符串，则会做为 ref 获取组件的显示对象，如果的是一个组件实例，这获取该实例的显示对象，如果传入是显示对象，则返回显示对象本身，否则返回 null

- 参数：

  - `{ string | Component | egret.DisplayObject } ref1` 显示对象
  - `{ boolean } isAll` 如果设置为 true 时，返回$refs 引用的所有显示对象数组，否则返回第一个显示对象

- 返回: `{ egret.DisplayObject | Array<egret.DisplayObject> }`

- 用法：

```javascript
/* 传入ref name */
vm.$displayObject('refName'); // vm.$refs[refName] |  vm.$refs[refName][0]
vm.$displayObject('refName', true); // vm.$refs[refName]

/* 传入Component */
vm.$displayObject(vm); // vm.$el
```

### vm.$hitTest

用于检测两个显示对象间是否存在碰撞，这里不做精确碰撞像素检测，只是根据显示对象的测量边界进行检测判断。

- 参数：

  - `{ string | Component | egret.DisplayObject } ref1` 显示对象 1
  - `{ string | Component | egret.DisplayObject } ref2` 显示对象 2

- 返回: `{ boolean }`

- 用法：

```javascript
/* 传入ref name */
vm.$hitTest('refName1', 'refName2';

/* 传入Component */
vm.$hitTest(VueEgret.extend({ /* ... */ }), 'refName2');

/* 传入DisplayObject */
vm.$hitTest(vm.$el, 'refName1');
```

### vm.$hitTestPiont

计算显示对象，以确定它是否与 x 和 y 参数指定的点重叠或相交。x 和 y 参数指定舞台的坐标空间中的点，而不是包含显示对象的显示对象容器中的点（除非显示对象容器是舞台）。注意，不要在大量物体中使用精确碰撞像素检测，这回带来巨大的性能开销

- 参数：

  - `{ string | Component | egret.DisplayObject } ref` 显示对象
  - `{ number } x` 测试坐标 x
  - `{ number } y` 测试坐标 y
  - `{ boolean } shapeFlag` 检查对象 (true) 的实际像素，还是检查边框 (false) 的实际像素。

- 返回: `{ boolean }`

- 用法：

```javascript
/* 传入ref name */
vm.$hitTestPiont('refName', 0, 0);

/* 传入Component */
vm.$hitTestPiont(
  VueEgret.extend({
    /* ... */
  }),
  0,
  0,
);

/* 传入DisplayObject */
vm.$hitTestPiont(vm.$el, 0, 0);
```

### vm.$globalToLocal

将从舞台（全局）坐标转换为显示对象的（本地）坐标。

- 参数：

  - `{ string | Component | egret.DisplayObject } ref` 显示对象
  - `{ number } stateX` 舞台坐标 x
  - `{ number } stateY` 舞台坐标 y

- 返回: `{ egret.Point }`

- 用法：

```javascript
/* 传入ref name */
vm.$globalToLocal('refName', 0, 0);

/* 传入Component */
vm.$globalToLocal(
  VueEgret.extend({
    /* ... */
  }),
  0,
  0,
);

/* 传入DisplayObject */
vm.$globalToLocal(vm.$el, 0, 0);
```

### vm.$localToGlobal

将从舞台（全局）坐标转换为显示对象的（本地）坐标。

- 参数：

  - `{ string | Component | egret.DisplayObject } ref` 显示对象
  - `{ number } localY` 本地坐标 x
  - `{ number } localY` 本地坐标 y

- 返回: `{ egret.Point }`

- 用法：

```javascript
/* 传入ref name */
vm.$localToGlobal('refName', 0, 0);

/* 传入Component */
vm.$localToGlobal(
  VueEgret.extend({
    /* ... */
  }),
  0,
  0,
);

/* 传入DisplayObject */
vm.$localToGlobal(vm.$el, 0, 0);
```

## 指令

### v-if

根据表达式的值的 `truthy` 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。

- 预期：`any`

- 用法：

```javascript
<TextField v-if="val < 5">v-if</TextField>
```

> 当和 v-if 一起使用时，v-for 的优先级比 v-if 更高。

### v-else

为 `v-if` 或者 `v-else-if` 添加“else 块”。

- 预期：不需要表达式，但前一兄弟元素必须有 `v-if` 或 `v-else-if`。

- 用法：

```javascript
<TextField v-if="val < 5">v-if</TextField>
<TextField v-else>v-else</TextField>
```

### v-else-if

表示 `v-if` 的“else if 块”。可以链式调用。

- 预期：`any`，前一兄弟元素必须有 v-if 或 v-else-if。

- 用法：

```javascript
<TextField v-if="val < 5">v-if</TextField>
<TextField v-else-if="val < 10">v-else-if</TextField>
<TextField v-else>v-else</TextField>
```

### v-for

基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression，为当前遍历的元素提供别名。

- 预期：`Array | Object | number | string | Iterable`

- 用法：

```javascript
<Sprite v-for="item in items" :y="item*20"></Sprite>
```

另外也可以为数组索引指定别名 (或者用于对象的键)：

```javascript
<Sprite v-for="(item, index) in items"></Sprite>
<Sprite v-for="(val, key) in object"></Sprite>
<Sprite v-for="(val, name, index) in object"></Sprite>
```

`v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊 `attribute key` 来提供一个排序提示：

```javascript
<Sprite v-for="item in items" :key="item.id"></Sprite>
```

> 当和 v-if 一起使用时，v-for 的优先级比 v-if 更高。

### v-bind

动态地绑定一个或多个 `attribute`，或一个组件 `prop` 到表达式。

在绑定 `prop` 时，`prop` 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

没有参数时，可以绑定到一个包含键值对的对象。

- 缩写：`:`
- 预期：`any (with argument) | Object (without argument)`
- 参数：`attrOrProp (optional)`
- 修饰符：

  - `.sync` - 同步语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器。

- 用法：

```javascript
<!-- 绑定一个 attribute -->
<TextField :text="text"></TextField>

<!-- 动态 attribute 名 -->
<TextField v-bind:[key]="value"></TextField>

<!-- 内联字符串拼接 -->
<TextField :text="'test:' + text"></TextField>

<!-- 绑定一个全是 attribute 的对象 -->
<TextField v-bind="{ text: text }"></TextField>

<!-- 通过 $attrs 将父组件的 attrs 一起传给子组件 -->
<child-component v-bind="$attrs"></child-component>

<!-- 通过 .sync 修饰符 -->
<TextField v-bind:text.sync="text"></TextField>
// => <TextField v-bind:text="text" @update:text="$event => text = $event;"></TextField>
```

### v-on

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

用在普通显示对象上时，只能监听原生事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。

在监听原生事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event property：v-on:click="handle('ok', $event)"`。

- 缩写：`@`
- 预期：`Function | Inline Statement | Object`
- 参数：`event`
- 修饰符：

  - `.stop` - 调用 event.stopPropagation()。
  - `.prevent` - 调用 event.preventDefault()。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  - `.native` - 监听组件根元素的原生事件。
  - `.once` - 只触发一次回调。

- 用法：

```javascript
<!-- 方法处理器 -->
<Sprite v-on:touchTap="doThis"></Sprite>

<!-- 动态事件 -->
<Sprite v-on:[event]="doThis"></Sprite>

<!-- 内联语句 -->
<Sprite v-on:touchTap="doThat('hello', $event)"></Sprite>

<!-- 缩写 -->
<Sprite @touchTap="doThis"></Sprite>

<!-- 动态事件缩写 -->
<Sprite @[event]="doThis"></Sprite>

<!-- 停止冒泡 -->
<Sprite @touchTap.stop="doThis"></Sprite>

<!-- 阻止默认行为 -->
<Sprite @touchTap.prevent="doThis"></Sprite>

<!-- 阻止默认行为，没有表达式 -->
<Sprite @touchTap.prevent></Sprite>

<!--  串联修饰符 -->
<Sprite @touchTap.stop.prevent="doThis"></Sprite>

<!-- 点击回调只会触发一次 -->
<Sprite v-on:touchTap.once="doThis"></Sprite>

<!-- 对象语法 -->
<Sprite v-on="{ touchBegin: doThis, touchEnd: doThat }"></Sprite>
```

在子组件上监听自定义事件 (当子组件触发“my-event”时将调用事件处理器)：

```javascript
<my-component @my-event="handleThis"></my-component>

<!-- 内联语句 -->
<my-component @my-event="handleThis(123, $event)"></my-component>

<!-- 组件中的原生事件 -->
<my-component @touchTap.native="onTouchTap"></my-component>
```

## 特殊 attribute

### key

`key` 的特殊 attribute 主要用在 VueEgret 的虚拟节点 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，VueEgret 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

- 预期：`number | string | symbol`

- 用法：

最常见的用例是结合 v-for：

```javascript
<Sprite v-for="item in items" :key="item.id"></Sprite>
```

它也可以用于强制替换元素/组件而不是重复使用它。

### ref

ref 被用来给显示对象或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DisplayObject 对象上使用，引用指向的就是 DisplayObject 对象；如果用在子组件上，引用就指向组件实例：

- 预期：`string`

- 用法：

```javascript
<!-- `vm.$refs.sp` will be the DisplayObject node -->
<Sprite ref="sp"></Sprite>

<!-- `vm.$refs.child` will be the child component instance -->
<child-component ref="child"></child-component>
```

当 `v-for` 用于元素或组件的时候，引用信息将是包含 DisplayObject 对象或组件实例的数组。

> 关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！`$refs` 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。

### is

用于动态组件。

- 预期：`string`

- 用法：

```javascript
<!-- 当 `currentView` 改变时，组件也跟着改变 -->
<component v-bind:is="currentView"></component>
```

## 内置的组件

### component

- Props：

  - is - string

- 用法：

渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。

```javascript
<!-- 动态组件由 vm 实例的 `componentId` property 控制 -->
<component :is="componentId"></component>
```
