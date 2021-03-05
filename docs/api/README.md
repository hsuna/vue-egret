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
    data(){
        return {
            text: 'Hello Word!!!'
        }
    },
    methods: {
        onTextClick(){
            this.text = 'Text is Click'
        }
    },
    template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
        <TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
    </Sprite>`
})
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
    data(){
        return {
            text: 'Hello Word!!!'
        }
    },
    methods: {
        onTextClick(){
            this.text = 'Text is Click'
        }
    },
    template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
        <TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
    </Sprite>`
})
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
var Profile = Vue.extend({
    data(){
        return {
            text: 'Hello Word!!!'
        }
    },
    methods: {
        onTextClick(){
            this.text = 'Text is Click'
        }
    },
    template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
        <TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
    </Sprite>`
})

// 创建 Profile 实例，并添加到显示对象。
var container = new egret.DisplayObjectContainer();
container.addChild((new Profile()).$el)
```

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
VueEgret.component('my-component', VueEgret.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 VueEgret.extend)
VueEgret.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = VueEgret.component('my-component')
```

### VueEgret.version

提供字符串形式的 `VueEgret` 安装版本号，你可以根据不同的版本号采取不同的策略。

- 用法：

```javascript
var version = VueEgret.version;
console.log(version)
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
vm.a // => 1
vm.$data.a === data // => 1

// VueEgret.extend()或VueEgret.component() 中 data 必须是函数
var Component = VueEgret.extend({
  data: function () {
    return { a: 1 }
  }
})
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
  props: ['size', 'height']
})

// 对象语法，提供默认值
Vue.component('my-component', {
  props: {
    // 检测类型
    height: Number,
    // 检测类型 + 默认值
    age: {
      type: Number,
      default: 0,
    }
  }
})
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
        sum: function() {
            return this.a + this.b;
        },
        plus: {
            get: function() {
                return this.a + 1;
            },
            set: function(v) {
                this.a = v - 1;
            }
        }
    }
});
vm.plus // => 2
vm.plus = 3;
vm.a    // => 2
vm.sum  // => 4
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
        this.a++
        }
    }
})
vm.plus()
vm.a        // 2
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
                g: 5
            }
        }
    },
    watch: {
        a: function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal)
        },
        // 方法名
        b: 'someMethod',
        // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
        c: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
        },
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler: 'someMethod',
            immediate: true
        },
        // 你可以传入回调数组，它们会被逐一调用
        e: [
            'handle1',
            function handle2 (val, oldVal) { /* ... */ },
            {
                handler: function handle3 (val, oldVal) { /* ... */ },
                /* ... */
            }
        ],
        // watch vm.e.f's value: {g: 5}
        'e.f': function (val, oldVal) { /* ... */ }
  }
})
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
})
```

### render

- 类型：`(createVNode:(tag:string, data:any, children:Array<VNode>) => VNode) => VNode`

- 说明：

字符串模板的代替方案。该渲染函数接收一个 createVNode 方法作为第一个参数用来创建 VNode。使用`render`可以减少解析`template`时花费的时间，减少运行时间。

> 注意：`VueEgret` 选项中的 `render` 函数若存在，则 `VueEgret` 构造函数不会从 `template` 选项编译渲染函数。

- 用法：

```javascript
var vm = new VueEgret({
    render: function(h) {
        return h('Sprite', [
            h('TextField', {
                attrs: {
                    textColor: "#00FFFF",
                    x: 100,
                    y: 100,
                    text: "xxxxx"
                }
            })
        ])
    }
})
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
    console.log(this.$options.customOption) // => 'foo'
  }
})
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

- 类型：`Object`

- 说明：

一个对象，持有注册过 `ref attribute` 的所有显示对象和组件实例。

## 实例方法 / 数据

### vm.$watch

### vm.$set

### vm.$delete

## 实例方法 / 事件

### vm.$on

### vm.$once

### vm.$off

### vm.$emit

## 实例方法 / 生命周期

### vm.$mount

### vm.$forceUpdate

### vm.$nextTick

### vm.$destroy

## 指令

## 特殊 attribute

### key

### ref
