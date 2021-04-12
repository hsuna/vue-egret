---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 脏矩形

脏矩形是2D图形性能优化一个重要的概念。Egret2.5开始脏矩形完全可以由引擎自动计算，即大名鼎鼎的"自动脏矩形"。

简单说脏矩形，就是画面刷新时，产生变化而需要重绘的舞台局部区域。使用脏矩形将大大减少无用的渲染工作量，降低额外性能消耗。对移动设备来说，会节省大量电能以及降低设备运行温度。

大多数情况，开发者不需要关心脏矩形如何工作。用网游术语说，自动脏矩形是Egret引擎的一项被动技能，引擎运行时会每帧自动释放该技能来提升你的程序性能！

脏矩形的红框可以在index.html中搜索data-show-paint-rect属性，设置其值为"true"即可，发布给用户前，确保该值重置为"false"。

::: demo:type=example&showPaintRect=true

```javascript
var NUM = 32;
var SCALE_BASE = 0.5;
var SCALE_RANGE = 0.5;

var ROT = 0;
var MOV = 1;

var Main = VueEgret.classMain({
  data: function () {
    return {
      scaleBase: 0,
      motionMode: 0,
      anchorOffsetX: 0,
      anchorOffsetY: 0,
      rectScope: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      birds: [],
      texture: null,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var bmd = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      this.texture = texture;

      this.anchorOffsetX = bmd.width / 2;
      this.anchorOffsetY = bmd.height / 2;
      this.rectScope = {
        x: this.anchorOffsetX * SCALE_BASE,
        y: this.anchorOffsetY * SCALE_BASE,
        width: this.$stageWidth - this.anchorOffsetX * SCALE_BASE * 2,
        height: this.$stageHeight - this.anchorOffsetY * SCALE_BASE * 2,
      };

      for (var i = 0; i < NUM; i++) {
        this.birds.push({
          /// 给一个随机的初始位置
          x: this.rectScope.x + this.rectScope.width * Math.random(),
          y: this.rectScope.y + this.rectScope.height * Math.random(),
          rotation: 0,
          scale: SCALE_BASE,
        });
      }

      this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.planRdmMotion, this);
      this.planRdmMotion();
    }, this);
    imgLoader.load('../resource/cartoon-egret_01_small.png');

    var shape = this.$refs['shape'];
    shape.graphics.clear();
    shape.graphics.beginFill(0xffffff, 0.5);
    shape.graphics.drawRect(0, 0, this.$refs['label'].width, this.$refs['label'].height);
    shape.graphics.endFill();
  },
  methods: {
    onEnterFrame: function() {
      if (!this.birds.length) return;

      /*** 本示例关键代码段开始 ***/
      switch (this.motionMode) {
        case ROT: /// 旋转并伴随缩放
          var scale = SCALE_BASE + Math.abs(Math.sin((this.scaleBase += 0.03))) * SCALE_RANGE;
          for (var i = 3; i > 0; i--) {
            var bird = this.birds[this.birds.length - i];
            bird.rotation += i % 2 ? 3 : -3;
            bird.scale = scale;
          }
          break;
        case MOV:
          var left = this.rectScope.x,
            right = this.rectScope.x + this.rectScope.width;
          var xTo;
          if ((xTo = this.birds[this.birds.length - 3].x - 3) < left) xTo = right;
          this.birds[this.birds.length - 3].x = xTo;
          if ((xTo = this.birds[this.birds.length - 2].x + 3) > right) xTo = left;
          this.birds[this.birds.length - 2].x = xTo;
          if ((xTo = this.birds[this.birds.length - 3].x - 3) < left) xTo = right;
          this.birds[this.birds.length - 1].x = xTo;
          break;
      }
      /*** 本示例关键代码段结束 ***/
    },
    planRdmMotion: function () {
      /// 随机一个运动模式
      this.motionMode = Math.random() > 0.5 ? 0 : 1;

      /// 还原比例
      this.birds[this.birds.length - 3].scale = SCALE_BASE;
      this.birds[this.birds.length - 2].scale = SCALE_BASE;
      this.birds[this.birds.length - 1].scale = SCALE_BASE;

      /// 随机取三个位置的白鹭小鸟并且确保深度最高
      var motions = [];
      for (var i = 3; i > 0; i--) {
        motions = motions.concat(
          this.birds.splice(Math.floor(this.birds.length * Math.random()), 1),
        );
      }
      this.birds = this.birds.concat(motions);
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
    <Bitmap v-for="bird in birds" :x="bird.x" :y="bird.y" :scaleX="bird.scale" :scaleY="bird.scale" :rotation="bird.rotation" :anchorOffsetX="anchorOffsetX" :anchorOffsetY="anchorOffsetY" :texture="texture"></Bitmap>
    <TextField ref="label" :width="$stageWidth-100" x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline touchEnabled>轻触以改变运动的小鸟及运动模式，观察不同的小鸟变化对应的脏矩形变化</TextField>
    <Shape ref="shape" x="50" y="50" cacheAsBitmap></Shape>
  </DisplayObjectContainer>`,
})
```

:::
