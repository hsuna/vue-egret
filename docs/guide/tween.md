# 缓动动画

VueEgret 的缓动动画沿用了 Tween 库提供的方法，通过简单的属性补间达到显示对象的动画效果。

::: demo

```javascript
var Main = VueEgret.classMain({
    data: function(){
        return {
            top: 0,
            left: 0
        }
    },
    methods: {
        onTouchTap() {
            this.$tween([['to', { left: 100, top: 50 }, 1000]])
        },
    },
    template: `<TextField 
        :x="left"
        :y="top"
        touchEnabled
        @touchTap="onTouchTap"
    >Click This!</TextField>`
})
```

:::

## 动画列表

有时我们除了让显示对象移动外，还需要在移动完成后渐隐，这时我们就需要执行多个不同步的动画，因此 VueEgret 提供了动画列表的方式，使得显示对象可以执行一系列的动画效果。

::: demo

```javascript
var Main = VueEgret.classMain({
    data: function(){
        return {
            top: 0,
            left: 0,
            opacity: 1
        }
    },
    methods: {
        onTouchTap: function() {
            this.$tween([
                ['to', { left: 100, top: 50 }, 1000],
                ['to', { opacity: 0 }, 1000]
            ])
        },
    },
    template: `<TextField 
        :x="left"
        :y="top"
        :alpha="opacity"
        touchEnabled
        @touchTap="onTouchTap"
    >Click This!</TextField>`
})
```

:::

### 动作类型

动画列表主要有三种动作效果`set`，`to`，`wait`三种动作：

- set：将指定对象的属性修改为指定的值，详细见[egret.tween.Set](http://developer.egret.com/cn/apidoc/index/name/egret.tween.Set)
    - props 对象的属性集合
- to: 根据时间，缓动的将指定对象的属性修改为指定值，详细见[egret.tween.To](http://developer.egret.com/cn/apidoc/index/name/egret.tween.To)
    - props 对象的属性集合
    - duration 持续时间
    - ease 缓动算法
- wait: 等待指定毫秒后执行下一个动画，详细见[egret.tween.Wait](http://developer.egret.com/cn/apidoc/index/name/egret.tween.Wait)
    - duration 要等待的时间，以毫秒为单位
    - passive 等待期间属性是否会更新

::: demo

```javascript
var Main = VueEgret.classMain({
    data: function(){
        return {
            top: 0,
            left: 0,
            opacity: 1
        }
    },
    methods: {
        onTouchTap: function() {
            this.$tween([
                ['set', { left: 100, top: 50 }],
                ['wait', 2000],
                ['to', { opacity: 0 }, 1000]
            ])
        },
    },
    template: `<TextField 
        :x="left"
        :y="top"
        :alpha="opacity"
        touchEnabled
        @touchTap="onTouchTap"
    >Click This!</TextField>`
})
```

:::

## 动画执行完成回调

`vm.$tween`会返回一个 `Promise`，在动画执行完成后通过`promise.then()`方法接收。

::: demo

```javascript
var Main = VueEgret.classMain({
    data: function(){
        return {
            left: 0,
            top: 0,
            message: 'Click This!'
        }
    },
    methods: {
        onTouchTap() {
            var self = this;
            this.$tween([['to', { left: 100, top: 50 }, 1000]])
                .then(function(tween) {
                    self.message = 'Tween finish!'
                })
        },
    },
    template: `<TextField 
        :x="left"
        :y="top"
        touchEnabled
        @touchTap="onTouchTap"
    >{{message}}</TextField>`
})
```

:::

当然我们也可以通过 `Promise` 完成一系列的动画效果，甚至根据条件做出不同的动画效果。

::: demo

```javascript
var Main = VueEgret.classMain({
    data: function(){
        return {
            left: 0,
            top: 0,
            message: 'Click This!'
        }
    },
    methods: {
        onTouchTap() {
            var self = this;
            this.$tween([
                ['set', { left: 0, top: 0 }],
                ['to', { left: 100, top: 50 }, 1000],
            ]).then(function(tween) {
                if(Math.random() > .5) {
                    self.message = 'To Left!'
                    return self.$tween([['to', { left: 0, top: 50 }, 1000]])
                } else {
                    self.message = 'To Right!'
                    return self.$tween([['to', { left: 200, top: 50 }, 1000]])
                }
            }).then(function(tween) {
                self.message = 'Click again!'
            })
        },
    },
    template: `<TextField 
        :x="left"
        :y="top"
        touchEnabled
        @touchTap="onTouchTap"
    >{{message}}</TextField>`
})
```

:::