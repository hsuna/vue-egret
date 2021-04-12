---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 最基本的显示

显示对象最基本的操作。

- 显示对象可以是外部加载的JPG、PNG图片资源，也可以是程序绘制的形状。
- 所有的显示对象显示均需要添加到显示列表。

::: demo:type=example

```javascript
var Main = VueEgret.classMain({
  data: function() {
    return {
      x: 100,
      y: 100,
      anchorOffsetX: 0,
      anchorOffsetY: 0,
      texture: null,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function(evt) {
      var bmd = evt.currentTarget.data;
      /// 为定位设置基准点(即锚点)
      this.anchorOffsetX = bmd.width / 2;
      this.anchorOffsetY = bmd.height / 2;
      this.x = this.$stageWidth * 0.5;
      this.y = this.$stageHeight * 0.5;

      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      this.texture = texture;
    }, this);
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(evt) {
      this.x = evt.localX;
      this.y = evt.localY;
    }, this);
  },
  template: `<DisplayObjectContainer>
      <Bitmap :x="x" :y="y" :anchorOffsetX="anchorOffsetX" :anchorOffsetY="anchorOffsetY" :texture="texture"></Bitmap>
      <TextField x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>轻触屏幕调整显示对象位置</TextField>
  </DisplayObjectContainer>`,
})
```

:::
