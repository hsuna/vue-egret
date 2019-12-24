# Changelog

[Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 1.2.2 - 2019-12-24
### Fixed
- 针对`props`复杂类型会不断赋值，更新数据导致性能底的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/observer/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/79232b6a5554d54c4f8c392955f9ba46e95c6b94/src/observer/index.ts#L80-88) L80-88


## 1.2.1 - 2019-12-20
### Changed
- 添加`$stageWidth`和`$stageHeight`字段，用于舞台宽高的属性访问
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/581fe422f441dc5da9df0c587a4a3b7b0309a617/src/index.ts#L400-413) L400-413

### Fixed 
- 修改模板解析调用characters方法时，换行符未处理，导致报错的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/parser/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/d8f7f7d8e7bf8aa2dd1cb6e09c9567cabef4e166/src/parser/index.ts#L60-69) L60-69


## 1.2.0 - 2019-12-19
### Changed 
- 修改渲染方法及VueEgret暴露的方法，所有显示对象不再创建`egret.DisplayObjectContainer`进行包裹，而是直接使用root作为节点
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/a226a30f8b1721388360f5eb14eaf8eef1d92e8a/src/index.ts)
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/render/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/a226a30f8b1721388360f5eb14eaf8eef1d92e8a/src/render/index.ts)


## 1.1.6 - 2019-12-18
### Fixed
- 修复`props`继承错误的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/render/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/488601b6c0c0e834e6462e4e101d35833bcc5f5f/src/render/index.ts#L196-197) L196-197


## 1.1.5 - 2019-12-16
### Changed
- 为`$tween`方法添加参数
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/f94e59468d17e3bd3687040cf0494cbb69426a2d/src/index.ts#L288-288) L288-288

### Fixed
- 修改`props`默认值错误的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/dd2e98b1147e4c7df3ab4a7a352669e73021da56/src/index.ts#L113-113) L113-113
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/util/props.ts](http://git.3k.com/web/Tech/vue-egret/blob/dd2e98b1147e4c7df3ab4a7a352669e73021da56/src/util/props.ts#L23-37) L23-37


## 1.1.4 - 2019-12-13
### Fixed
- 修复渲染器销毁后依然监听的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/9eed0e2fba419ffd9b8173bc4c800386bc591264/src/index.ts#L93-93) L93-93


## 1.1.3 - 2019-12-13
### Changed
- 在节点比较时，添加属性`key`值的比较，避免循环列表时，渲染错误的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/render/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/6cc23a685d91b7c2f4d32e264da849568a5cc842/src/render/index.ts#L141-141) L141-141


## 1.1.2 - 2019-12-13
### Fixed
- 修正diff的算法，导致渲染对象丢失的问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/render/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/34a408f16fdd942a2d888411adb67eb22fcf56d6/src/render/index.ts#L124-132) L124-132


## 1.1.1 - 2019-12-12
### Added
- 全局添加`$tweenTo`、`$tweenWait`、`$tweenPromise`方法用于各类动画使用
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/711de0ea39a42cc1390c9db6d65153742222a311/src/index.ts#L280-312) L280-312

- 添加`$hitTest`和`$hitTestPoint`方法用户碰撞检测
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/711de0ea39a42cc1390c9db6d65153742222a311/src/index.ts#L235-256) L235-256

### Changed
- 优化`$tween`方法
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/711de0ea39a42cc1390c9db6d65153742222a311/src/index.ts#L269-279) L269-279

- 为`$globalToLocal`和`$localToGlobal`引入`ComponentRef`类型
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/711de0ea39a42cc1390c9db6d65153742222a311/src/index.ts#L257-268) L257-268


## 1.1.0 - 2019-12-12
### Added
- 全局添加`$stage`属性替代显示对象实例的`stage`属性
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/09cb86bee58e46019c4b1d95b43493fa28349775/src/index.ts#L98-105) L98-105

- 全局添加`$tween`方法用于封装`egret.Tween`方法
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/09cb86bee58e46019c4b1d95b43493fa28349775/src/index.ts#L248-253) L248-253


## 1.0.2 - 2019-12-11
### Fixed
- 修正observer对象判断错误，导致无法扩展的对象进行observer时报错
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/observer/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/3626634f91d24a4bec74cb2246e12dc241049686/src/observer/index.ts#L104-108) L104-108


## 1.0.1 - 2019-12-11
### Fixed
- 修正`toNumber`方法，导致空数组转化为0的判断问题
    * ![Modify](https://img.shields.io/badge/M-d7af23) [@master:src/util/index.ts](http://git.3k.com/web/Tech/vue-egret/blob/7695fe205dbbb8b584f5e8f357dce62f3f3d9d91/src/util/index.ts#L36-36) L36-36


## 1.0.0 - 2019-10-31
### Released
- 完成所有功能开发，并发布1.0.0