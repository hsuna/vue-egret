---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 基本FPS监视器

开启帧频信息面板Egret会在舞台的左上角显示FPS和其他性能指标
 
在index文件内找到`data-show-fps`字段，设置为`true`即可显示帧频信息，反之关闭。

其中:
- FPS: 帧频
- Draw: 每帧draw方法调用的平均次数，脏区域占舞台的百分比
- Cost: Ticker和EnterFrame阶段显示的耗时,每帧舞台所有事件处理和矩阵运算耗时，绘制显示对象耗时（单位是ms）

::: demo:type=example&showFps=true

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
