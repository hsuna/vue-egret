---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 脏矩形调试显示

打开脏矩形显示调试开关可以看到屏幕刷新区域。

在index.html文件内找到`data-show-paint-rect`字段设置为`true`即可打开脏矩形显示调试开关，反之关闭。

::: demo:type=example&showPaintRect=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      direction: 1,
      speed: 1,
      rotation: 0,
      texture: null,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = evt.currentTarget.data;
      this.texture = texture;
    }, this);
    imgLoader.load('../resource/cartoon-egret_00.png');
  },
  methods: {
    onEnterFrame: function () {
      this.rotation += this.direction * this.speed;
      if (this.rotation > 45) this.direction = -1;
      else if (this.rotation < -45) this.direction = 1;
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
    <Bitmap :x="$stageWidth/2" :y="$stageHeight/2" :rotation="rotation" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
  </DisplayObjectContainer>`,
})
```

:::
