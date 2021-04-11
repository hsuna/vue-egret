---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 高级圆弧

本示例基于画弧 api，实现圆形遮罩功能。

::: demo:type=example&background=#35414d

```javascript
var Main = VueEgret.classMain({
  data: function () {
    return {
      mask: null,
      texture: null,
      angle: 0,
      anticlockwise: 1,
    };
  },
  mounted: function () {
    var self = this;
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = evt.currentTarget.data;
      self.texture = texture;
    });
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.mask = this.$refs.shape;
  },
  methods: {
    onEnterFrame: function () {
      if (!this.$refs.shape) return;
      this.angle += 1;
      if (this.angle >= 360) {
        this.angle = this.angle % 360;
        this.anticlockwise *= -1;
      }
      this.changeGraphics();
    },
    changeGraphics: function () {
      var shape = this.$refs.shape;
      shape.graphics.clear();
      shape.graphics.beginFill(0x00ffff, 1);
      shape.graphics.moveTo(0, 0);
      shape.graphics.lineTo(200, 0);
      shape.graphics.drawArc(0, 0, 200, 0, (this.angle * Math.PI) / 180, this.anticlockwise == -1);
      shape.graphics.lineTo(0, 0);
      shape.graphics.endFill();
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
      <Shape ref="shape" :x="$stageWidth/2" :y="$stageHeight/2"></Shape>
      <Bitmap width="228" height="380" :x="$stageWidth/2-114" :y="$stageHeight/2-190" :texture="texture" :mask="mask"></Bitmap>
  </DisplayObjectContainer>`,
});
```

:::
