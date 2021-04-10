---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 碰撞检测

碰撞检测分为两种模式，一种是对显示对象所在的矩形包围盒检测，另一种是其透明度不为零的区域检测。

为达到一个好的交互，本示例代码较多，但是核心检测碰撞只有一个API，就是`vm.$hitTestPoint`。

::: demo:type=example

```javascript
var NO_TOUCHED = 0;
var TOUCHED_NO_COLLIDED = 1;
var COLLIDED = 2;

var Main = VueEgret.classMain({
  components: {
    DotShape: {
      mounted: function () {
        var shape = this.$refs.shape;
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawCircle(0, 0, 5);
        shape.graphics.endFill();
      },
      template: `<Shape ref="shape"></Shape>`,
    },
  },
  data: function () {
    return {
      status: NO_TOUCHED,
      shapeTest: false,
      showDot: false,
      dotX: 0,
      dotY: 0,
      anchorOffsetX: 0,
      anchorOffsetY: 0,
      texture: null,
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

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStateTouch, this);
  },
  methods: {
    onStateTouch: function (evt) {
      switch (evt.type) {
        case egret.TouchEvent.TOUCH_MOVE:
          this.checkCollision(evt.stageX, evt.stageY);
          break;
        case egret.TouchEvent.TOUCH_BEGIN:
          if (!this.$hitTestPoint('label', evt.stageX, evt.stageY)) {
            /// if代码确保触摸开始位置不在文字区域
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStateTouch, this);
            this.$stage.once(egret.TouchEvent.TOUCH_END, this.onStateTouch, this);
            this.showDot = true;
            this.checkCollision(evt.stageX, evt.stageY);
          }
          break;
        case egret.TouchEvent.TOUCH_END:
          this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStateTouch, this);
          this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStateTouch, this);
          this.showDot = false;
          this.status = NO_TOUCHED;
          break;
      }
    },
    onTextTouchTap: function () {
      this.shapeTest = !this.shapeTest;
      this.status = NO_TOUCHED;
    },
    checkCollision: function (stageX, stageY) {
      /// 小圆点同步手指位置
      this.dotX = stageX;
      this.dotY = stageY;
      this.status = this.$hitTestPoint('bird', stageX, stageY, this.shapeTest)
        ? COLLIDED
        : TOUCHED_NO_COLLIDED;
    },
  },
  template: `<DisplayObjectContainer>
      <Bitmap ref="bird" :x="$stageWidth*0.5" :y="$stageHeight*0.618" :anchorOffsetX="anchorOffsetX" :anchorOffsetY="anchorOffsetY" :texture="texture"></Bitmap>
      <DotShape v-if="showDot" :x="dotX" :y="dotY"></DotShape>
      <TextField ref="label" x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline touchEnabled @touchTap.stop="onTextTouchTap">
        碰撞检测结果：{{['放上手指！', '想摸我？', '别摸我！！！'][status]}}
        
        碰撞检测模式：{{shapeTest?'非透明像素区域':'矩形包围盒'}}
        （轻触文字区切换）
      </TextField>
  </DisplayObjectContainer>`,
})
```

:::
