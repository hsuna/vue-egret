---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 点击穿透

点击穿透功能是与碰撞检测的形状检测开关接近的概念。
 
 这两个功能，都是针对位图的完全透明像素区域来说的。打开点击穿透开关的位图，触摸其透明区域将不会再派发事件。

 请注意本示例与碰撞检测示例的示例表现虽然很接近，但实现方式完全不同：点击穿透需要通过触摸事件来检测，而碰撞检测不需要任何触摸，是直接用一个点对一个显示对象进行检测。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      dotX: 0,
      dotY: 0,
      showDot: false,
      isTouch: false,
      pixelHitTest: false,
      texture: null,
    };
  },
  mounted: function () {
    var self = this;
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var bmd = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      self.texture = texture;
    });
    imgLoader.load('../resource/cartoon-egret_01.png');
  },
  methods: {
    onTouchBegin(evt) {
      if (!this.$hitTestPoint('label', evt.stageX, evt.stageY)) {
        /// if代码确保触摸开始位置不在文字区域
        this.showDot = true;
        this.isTouch = true;
        this.onTouchMove(evt);

        this.$nextTick(function () {
          var shape = this.$refs['shape'];
          shape.graphics.beginFill(0x00ff00);
          shape.graphics.drawCircle(0, 0, 5);
          shape.graphics.endFill();
        });
      }
    },
    onTouchMove(evt) {
      if (this.isTouch) {
        this.dotX = evt.stageX;
        this.dotY = evt.stageY;
      }
    },
    onTouchEnd() {
      this.showDot = false;
      this.isTouch = false;
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap 
      :x="$stageWidth*0.5" 
      :y="$stageHeight*0.618" 
      rotation="35" 
      anchorOffsetX="75" 
      anchorOffsetY="125" 
      :pixelHitTest="pixelHitTest"
      :texture="texture" 
      touchEnabled 
      @touchBegin="onTouchBegin"
      @touchMove="onTouchMove"
      @touchEnd="onTouchEnd"

    ></Bitmap>
    <Shape v-if="showDot" ref="shape" :x="dotX" :y="dotY"></Shape>
    <TextField ref="label" x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline touchEnabled @touchTap.stop="pixelHitTest = !pixelHitTest">
      点击穿透检测结果：{{isTouch?'别碰我！！':'还没碰到！'}}
      点击穿透检测模式：{{pixelHitTest?'小白鹭透明穿透':'小白鹭无穿透'}}
      （轻触文字区切换）
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
