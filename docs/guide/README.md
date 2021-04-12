# 介绍

## VueEgret是什么？

VueEgret主要是应用在 egret 引擎库上的，它诞生的初衷是为了 egret 支持 Vue 的开发方式，在 egret 上所实现的一套 MVVM 框架。

## 它是如何工作的？

实际上，VueEgret 是基于 [egret](http://developer.egret.com/cn/apidoc/) 引擎库上运行的，使用 Vue 风格的开发方式，将 MVVM 的设计思想应用在 egret 上，代替传统的 MVC，通过驱动数据从而改变视图。

## 它的优势？

* 享受 Vue + webpack 的开发体验，使用 Vue 语法糖开发Egret。

```javascript
VueEgret.classMain({
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

* 使用MVVM设计模式替代传统的MVC，让交互更加方便。
* 实现虚拟Node，通过diff算法更新DisplayObject。
