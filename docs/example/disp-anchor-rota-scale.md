---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 锚点及旋转缩放

点是对显示对象进行操作的重要概念，切水果游戏中的水果旋转，是围绕其中心点旋转的。这个中心点就是我们所谓的锚点。
 
 锚点设置了一个基准点或者说中心点。显示对象的旋转和缩放均以锚点为基准。

::: demo:type=example

```javascript
/// 旋转及缩放步长设定
var STEP_ROT = 3;
var STEP_SCALE = .03;
/// 模式
var ANIM_ROT = 0;
var ANIM_SCALE = 1;

var Main = VueEgret.classMain({
  data: function () {
    return {
      rotation: 0,
      scale: 1,
      anchorOffsetX: 0,
      anchorOffsetY: 0,
      texture: null,
      animMode: ANIM_ROT,
      scaleBase: 0,
    };
  },
  mounted: function () {
    var self = this;
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      var bmd = evt.currentTarget.data;
      /// 为定位设置基准点(即锚点)
      self.anchorOffsetX = bmd.width / 2;
      self.anchorOffsetY = bmd.height / 2;

      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      self.texture = texture;
    });
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
      self.x = evt.localX;
      self.y = evt.localY;
      self.animMode = (self.animMode + 1) % 3;
    });
  },
  methods: {
    onEnterFrame: function () {
      switch (this.animMode) {
        case ANIM_ROT: /// 仅旋转
          this.rotation += STEP_ROT;
          break;
        case ANIM_SCALE: /// 仅缩放，缩放范围 0.5~1
          this.scale = 0.5 + 0.5 * Math.abs(Math.sin((this.scaleBase += STEP_SCALE)));
          break;
      }
      this.text = '旋转角度:' + this.rotation
        + '\n缩放比例:' + this.scale.toFixed(2)
        + '\n\n轻触进入' + ['缩放', '静止', '旋转'][this.animMode] + '模式';
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
      <Bitmap :x="$stageWidth*0.5" :y="$stageHeight*0.618" :anchorOffsetX="anchorOffsetX" :anchorOffsetY="anchorOffsetY" :scaleX="scale" :scaleY="scale" :rotation="rotation" :texture="texture"></Bitmap>
      <TextField x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>
        旋转角度:{{rotation}}
        缩放比例:{{scale.toFixed(2)}}

        轻触进入{{['缩放', '静止', '旋转'][animMode]}}模式
      </TextField>
  </DisplayObjectContainer>`,
})
```

:::
