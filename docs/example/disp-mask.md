---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 遮罩的用法

任何显示对象都可以作为其他显示对象的遮罩。

显示对象作为遮罩后，就好像在屏幕的垂直方向有一个直射光源对齐投射产生影子。被遮罩的显示对象只能显示遮罩被投射后的影子区域。

::: demo:type=example

```javascript
var Main = VueEgret.classMain({
  data: function () {
    return {
      birdX: 0,
      birdY: 0,
      anchorOffsetX: 0,
      anchorOffsetY: 0,
      texture: null,
      shpBeMask: null,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      var bmd = evt.currentTarget.data;
      /// 为定位设置基准点(即锚点)
      var wHalfBird = bmd.width / 2;
      var hHalfBird = bmd.height / 2;
      this.anchorOffsetX = wHalfBird;
      this.anchorOffsetY = hHalfBird;
      /// 给一个随机的初始位置
      this.birdX = wHalfBird + (this.$stageWidth - wHalfBird * 2) * Math.random();
      this.birdY = hHalfBird + (this.$stageHeight - hHalfBird * 2) * Math.random();

      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      this.texture = texture;
    }, this);
    imgLoader.load('../resource/cartoon-egret_03.png');

    var mask = this.$refs['mask'];
    mask.graphics.lineStyle(0x000000);
    mask.graphics.beginFill(this.getRdmClr());
    mask.graphics.drawEllipse(0, 0, 200, 300);
    mask.graphics.endFill();

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStateTouch, this);
  },
  methods: {
    onStateTouch: function (evt) {
      switch (evt.type) {
        case egret.TouchEvent.TOUCH_MOVE:
          this.updateBird(evt.stageX, evt.stageY);
          break;
        case egret.TouchEvent.TOUCH_BEGIN:
          if (!this.$hitTestPoint('label', evt.stageX, evt.stageY)) {
            /// if代码确保触摸开始位置不在文字区域
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStateTouch, this);
            this.$stage.once(egret.TouchEvent.TOUCH_END, this.onStateTouch, this);
            this.shpBeMask = this.$refs['bird'];
            this.updateBird(evt.stageX, evt.stageY);
          }
          break;
        case egret.TouchEvent.TOUCH_END:
          this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStateTouch, this);
          this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStateTouch, this);
          this.shpBeMask = null;
          break;
      }
    },
    updateBird: function (stageX, stageY) {
      this.birdX = stageX;
      this.birdY = stageY;
    },
    getRdmClr: function () {
      return (
        (Math.floor(Math.random() * 0xff) << 16) +
        (Math.floor(Math.random() * 0xff) << 8) +
        Math.floor(Math.random() * 0xff)
      );
    },
  },
  template: `<DisplayObjectContainer>
      <Shape ref="mask" :x="($stageWidth-200)/2" :y="($stageHeight-300)/2" :mask="shpBeMask"></Shape>
      <Bitmap ref="bird" :x="birdX" :y="birdY" :anchorOffsetX="anchorOffsetX" :anchorOffsetY="anchorOffsetY" :texture="texture"></Bitmap>
      <TextField ref="label" x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>
        接触屏幕后白鹭小鸟将变为椭圆形状的遮罩区域，可以移动手指（白鹭小鸟）并观察椭圆在遮罩下的显示变化
      </TextField>
  </DisplayObjectContainer>`,
})
```

:::
