---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 位图缓存

位图缓存是一项在特定情况下可以提升性能的利器。其原理是将一组在相当长时间内显示状态及相对位置保持恒定的显示对象建立一个快照，在后续显示中用这个快照代替这一组显示内容。通常用于图形或文字。但请注意，仅当缓存的位图可以一次生成，且随后无需更新即可使用时，才适合使用位图缓存功能。并且缓存后的图像也不应该进行旋转、缩放及修改其透明度。否则将会因为频繁建立快照产生比不缓存性能更差的结果。

 本示例用了一组文字、一组绘制图形、和一组位图图形进行缓存，并且对缓存的内容进行缩放旋转或平移的操作。

::: demo:type=example&showFps=true

```javascript
var NUM = 64;
var SCALE_BASE = 0.7;
var SCALE_RANGE = 0.6;

var UNITS_PER_CONT = 16;

var MotionMode = {
  ROT: 0,
  MOV: 1,

  TOTAL: 2,
};

var L = {
  W_SHAPE: 160,
  H_SHAPE: 210,
};

var Main = VueEgret.classMain({
  data: function () {
    return {
      isCache: false,
      scaleBase: 0,
      motionMode: 1,
      motions: [],
    };
  },
  mounted: function () {
    for (var i = 0; i < NUM; i++) {
      this.motions.push({
        x: this.$stageWidth * Math.random(),
        y: this.$stageHeight * Math.random(),
        anchorOffsetX: L.W_SHAPE / 2,
        anchorOffsetY: L.H_SHAPE / 2,
        rotation: 0,
        scale: 1,
        factor: 0.8 + Math.random() * 0.4,
      });
    }

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.planRdmMotion, this);
    this.planRdmMotion();

    this.$nextTick(function () {
      for (var i = 0; i < UNITS_PER_CONT; i++) {
        this.prodRdmGraph();
      }
      for (var j = this.$refs.motion.length - 1; j >= 0; j--) {
        var motion = this.$refs.motion[j];
        this.motions[j].anchorOffsetX = motion.width / 2;
        this.motions[j].anchorOffsetY = motion.height / 2;
      }
    });
  },
  methods: {
    onEnterFrame() {
      /*** 本示例关键代码段开始 ***/
      switch (this.motionMode) {
        case MotionMode.ROT: /// 旋转并伴随缩放
          var scale = SCALE_BASE + Math.abs(Math.sin((this.scaleBase += 0.05))) * SCALE_RANGE;
          for (var i = this.motions.length - 1; i >= 0; i--) {
            this.motions[i].rotation += 3 * (i % 2 ? 1 : -1) * this.motions[i].factor;
            this.motions[i].scale = scale;
          }
          break;
        case MotionMode.MOV:
          var xTo;
          for (var i = this.motions.length - 1; i >= 0; i--) {
            xTo = this.motions[i].x + 3 * (i % 2 ? 1 : -1) * this.motions[i].factor;
            if (xTo < 0) {
              xTo = this.$stageWidth;
            } else if (xTo > this.$stageWidth) {
              xTo = 0;
            }
            this.motions[i].x = xTo;
          }
          break;
      }
      /*** 本示例关键代码段结束 ***/
    },
    prodRdmGraph: function () {
      var iTypeShape = Math.floor(Math.random() * 2);
      var iFillColor =
        (Math.floor(Math.random() * 0xff) << 16) +
        (Math.floor(Math.random() * 0xff) << 8) +
        Math.floor(Math.random() * 0xff);
      var radius = 20 + Math.random() * 10;
      var wRect = 30 + Math.random() * 20;
      var hRect = 20 + Math.random() * 10;
      var xRdm = L.W_SHAPE * Math.random();
      var yRdm = L.H_SHAPE * Math.random();
      for (var j = this.$refs.motion.length - 1; j >= 0; j--) {
        var motion = this.$refs.motion[j];
        motion.graphics.beginFill(iFillColor);
        switch (iTypeShape) {
          case 0: /// 矩形
            motion.graphics.drawRect(xRdm - wRect / 2, yRdm - hRect / 2, wRect, hRect);
            break;
          case 1: /// 圆形
            motion.graphics.drawCircle(xRdm, yRdm, radius);
            break;
        }
        motion.graphics.endFill();
      }
    },
    planRdmMotion: function (evt) {
      if (evt) {
        /// 第一次随机一个运动模式
        this.motionMode = (this.motionMode + 1) % MotionMode.TOTAL;
      } else {
        this.motionMode = Math.random() > 0.5 ? MotionMode.ROT : MotionMode.MOV;
      }

      /// 还原比例
      switch (this.motionMode) {
        case MotionMode.ROT:
          for (var i = this.motions.length - 1; i >= 0; i--) {
            this.motions[i].scale = SCALE_BASE;
          }
          break;
        case MotionMode.MOV:
          for (var i = this.motions.length - 1; i >= 0; i--) {
            this.motions[i].scale = SCALE_BASE + Math.random() * SCALE_RANGE;
          }
          break;
      }
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
    <Sprite ref="motion" v-for="motion in motions" :x="motion.x" :y="motion.y" :scaleX="motion.scale" :scaleY="motion.scale" :rotation="motion.rotation" :anchorOffsetX="motion.anchorOffsetX" :anchorOffsetY="motion.anchorOffsetY" :cacheAsBitmap="isCache"></Sprite>
    <TextField :width="$stageWidth-260" x="250" y="10" size="28" textAlign="left" textColor="0x000000" background backgroundColor="0xFFFFFF" type="dynamic" lineSpacing="6" multiline touchEnabled cacheAsBitmap @touchTap.stop="isCache = !isCache">
      轻触文字切换是否用位图缓存
      当前位图缓存：{{isCache?'启用\\n还卡？换手机吧！':'关闭\\n不卡只能说明机器太牛！'}}
      轻触舞台切换旋转缩放/平移
      当前运动：{{["旋转缩放" , "平移"][motionMode]}}
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
