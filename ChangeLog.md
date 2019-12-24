# Changelog

[Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## 1.2.1 - 2019-12-20
### Changed
- 添加`$stageWidth`和`$stageHeight`字段，用于舞台宽高的属性访问

### Fixed 
- 修改模板解析调用characters方法时，换行符未处理，导致报错的问题

## 1.2.0 - 2019-12-19
### Changed 
- 修改渲染方法及VueEgret暴露的方法，所有显示对象不再创建`egret.DisplayObjectContainer`进行包裹，而是直接使用root作为节点

## 1.1.6 - 2019-12-18
### Fixed
- 修复`props`继承错误的问题

## 1.1.5 - 2019-12-16
### Changed
- 为`$tween`方法添加参数

### Fixed
- 修改`props`默认值错误的问题

## 1.1.4 - 2019-12-13
### Fixed
- 修复渲染器销毁后依然监听的问题

## 1.1.3 - 2019-12-13
### Changed
- 在节点比较时，添加属性`key`值的比较，避免循环列表时，渲染错误的问题

## 1.1.2 - 2019-12-13
### Fixed
- 修正diff的算法，导致渲染对象丢失的问题

## 1.1.1 - 2019-12-12
### Added
- 全局添加`$tweenTo`、`$tweenWait`、`$tweenPromise`方法用于各类动画使用
- 添加`$hitTest`和`$hitTestPoint`方法用户碰撞检测

### Changed
- 优化`$tween`方法
- 为`$globalToLocal`和`$localToGlobal`引入`ComponentRef`类型

## 1.1.0 - 2019-12-12
### Added
- 全局添加`$stage`属性替代显示对象实例的`stage`属性
- 全局添加`$tween`方法用于封装`egret.Tween`方法

## 1.0.2 - 2019-12-11
### Fixed
- 修正observer对象判断错误，导致无法扩展的对象进行observer时报错

## 1.0.1 - 2019-12-11
### Fixed
- 修正`toNumber`方法，导致空数组转化为0的判断问题

## 1.0.0 - 2019-10-31
### Released
- 完成所有功能开发，并发布1.0.0

[1.2.0]: http://git.3k.com/web/Tech/vue-egret/commits/1.2.0
[1.1.6]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.6
[1.1.5]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.5
[1.1.4]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.4
[1.1.3]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.3
[1.1.2]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.2
[1.1.1]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.1
[1.1.0]: http://git.3k.com/web/Tech/vue-egret/commits/1.1.0
[1.0.2]: http://git.3k.com/web/Tech/vue-egret/commits/1.0.2
[1.0.1]: http://git.3k.com/web/Tech/vue-egret/commits/1.0.1
[1.0.0]: http://git.3k.com/web/Tech/vue-egret/commits/1.0.0