---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 屏幕调试日志

开启Log面板可以直接在游戏界面中显示Egret的Log。

在index.html文件内找到`data-show-log`字段设置为`true`即显示Log面板，反之关闭。

::: demo:type=example&showLog=true

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
      if (this.rotation > 45) {
        this.direction = -1;
        egret.log("====Change Direction====");
      } else if (this.rotation < -45) {
        this.direction = 1;
        egret.log("====Change Direction====");
      }
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
    <Bitmap :x="$stageWidth/2" :y="$stageHeight/2" :rotation="rotation" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
  </DisplayObjectContainer>`,
})
```

:::
