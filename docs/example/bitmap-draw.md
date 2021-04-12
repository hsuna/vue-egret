---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 动态截屏

动态截屏是一项非常酷的功能，他可以将指定显示对象(当然包括显示容器)中特定区域进行动态截取，保存为纹理格式，因此可以立即以位图的方式呈现出来！

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      GAP_UNIFIED: 50,
      CLIPS_START: 160,

      showEffect: false,
      texture: null,
      snapTexture: null,
      effectAlpha: 1,
      birds: [],
    };
  },
  computed: {
    rectClip() {
      return new egret.Rectangle(
        0,
        0,
        this.$stageWidth - this.GAP_UNIFIED * 2,
        (this.$stageHeight - (this.CLIPS_START + this.GAP_UNIFIED * 2)) / 2,
      );
    },
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var bmd = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      this.texture = texture;

      for (var i = 0; i < 24; ++i) {
        this.birds.push({
          x: this.rectClip.width * Math.random(),
          y: this.rectClip.height * Math.random(),
          anchorOffsetX: bmd.width / 2,
          anchorOffsetY: bmd.height / 2,
          scale: 0.5,
          rotation: 0,
          ///运动速度
          vx: Math.random() > 0.7 ? (1 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) : 0,
          vy: Math.random() > 0.7 ? (1 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) : 0,
          va: (1 + Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    }, this);
    imgLoader.load('../resource/cartoon-egret_01_small.png');

    var shpBg = this.$refs['shpBg'];
    /// 容器加入随机纯色背景
    var iFillColor =
      (Math.floor(Math.random() * 0xff) << 16) +
      (Math.floor(Math.random() * 0xff) << 8) +
      Math.floor(Math.random() * 0xff);
    shpBg.graphics.beginFill(iFillColor);
    shpBg.graphics.drawRect(0, 0, this.rectClip.width, this.rectClip.height);
    shpBg.graphics.endFill();

    var shapeSnapEffect = this.$refs['shapeSnapEffect'];
    shapeSnapEffect.graphics.beginFill(0xffffff);
    shapeSnapEffect.graphics.drawRect(0, 0, this.rectClip.width, this.rectClip.height);
    shapeSnapEffect.graphics.endFill();

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      var self = this;
      /*** 本示例关键代码段开始 ***/
      var rt = new egret.RenderTexture();
      rt.drawToTexture(this.$refs['birds'], this.rectClip);
      this.snapTexture = rt;
      /*** 本示例关键代码段结束 ***/

      this.showEffect = true;
      this.$tween([
        ['set', { effectAlpha: 1 }],
        ['to', { effectAlpha: 0 }, 500],
      ]).then(function () {
        self.showEffect = false;
      });
    },
    onEnterFrame: function () {
      for (var i = this.birds.length - 1; i > -1; --i) {
        var bird = this.birds[i];

        var xTo = bird.x + bird.vx;
        if (xTo > this.rectClip.width) xTo = 0;
        else if (xTo < 0) xTo = this.rectClip.width;
        bird.x = xTo;

        var yTo = bird.y + bird.vy;
        if (yTo > this.rectClip.height) yTo = 0;
        else if (yTo < 0) yTo = this.rectClip.height;
        bird.y = yTo;

        bird.rotation += bird.va;
      }
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame"> 
    <TextField x="50" y="50" :width="$stageWidth-100" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>
      屏幕分为两个小区域，上方是画面变换区域，下方是截屏显示区域。
      轻触屏幕进行截屏！
    </TextField>
    <Sprite ref="birds" :x="GAP_UNIFIED" :y="CLIPS_START" :mask="rectClip">
      <Shape ref="shpBg" cacheAsBitmap></Shape>
      <Bitmap v-for="bird in birds" :x="bird.x" :y="bird.y" :scaleX="bird.scale" :scaleY="bird.scale" :rotation="bird.rotation" :anchorOffsetX="bird.anchorOffsetX" :anchorOffsetY="bird.anchorOffsetY" :texture="texture"></Bitmap>
    </Sprite>
    <Bitmap :x="GAP_UNIFIED" :y="rectClip.bottom + CLIPS_START + GAP_UNIFIED" :texture="snapTexture"></Bitmap>
    <Shape ref="shapeSnapEffect" :x="GAP_UNIFIED" :y="rectClip.bottom + CLIPS_START + GAP_UNIFIED" :alpha="effectAlpha" cacheAsBitmap :visible="showEffect"></Shape>
  </DisplayObjectContainer>`,
})
```

:::
