---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 拖动

显示对象拖拽实例，点击显示元素开始拖拽，释放鼠标（或者抬起触摸手指）结束拖拽操作。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      touchStatus: false, // 当前触摸状态，按下时，值为true
      distance: new egret.Point(), // 鼠标点击时，鼠标全局坐标与_bird的位置差
      birdX: 0,
      birdY: 0,
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

    this.birdX = this.$stageWidth / 2;
    this.birdY = this.$stageHeight / 2;
  },
  methods: {
    onTouchBegin: function (evt) {
      this.touchStatus = true;
      this.distance.x = evt.stageX - this.birdX;
      this.distance.y = evt.stageY - this.birdY;
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    },
    onTouchMove: function (evt) {
      if (this.touchStatus) {
        this.birdX = evt.stageX - this.distance.x;
        this.birdY = evt.stageY - this.distance.y;
      }
    },
    onTouchEnd: function () {
      this.touchStatus = false;
      this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="birdX" :y="birdY" :texture="texture" :anchorOffsetX="114" :anchorOffsetY="190" touchEnabled @touchBegin="onTouchBegin" @touchEnd="onTouchEnd"></Bitmap>
    <TextField x="50" y="50" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>按住显示对象即可拖拽，释放鼠标停止拖拽</TextField>
  </DisplayObjectContainer>`,
})
```

:::
