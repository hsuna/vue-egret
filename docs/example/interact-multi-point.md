---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 多点触摸

需要在移动设备中预览，两个手指可控制DisplayObject缩放和旋转。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      anchorOffsetX: 0,
      anchorOffsetY: 0,
      scale: 1,
      rotation: 0,
      texture: null,

      touchNames: [],
      touchPoints: {},
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = evt.currentTarget.data;
      this.texture = texture;

      this.anchorOffsetX = texture.bitmapData.width / 2;
      this.anchorOffsetY = texture.bitmapData.height / 2;
    }, this);
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
  },
  watch: {
    distance: function (newVal, oldVal) {
      if (2 == this.touchNames.length && -1 != oldVal) {
        this.scale = (this.scale * newVal) / oldVal;
      }
    },
    angle: function (newVal, oldVal) {
      if (2 == this.touchNames.length && -1 != oldVal) {
        this.rotation = this.rotation + newVal - oldVal;
      }
    },
  },
  computed: {
    distance: function () {
      if (2 == this.touchNames.length) {
        return egret.Point.distance(
          this.touchPoints[this.touchNames[0]],
          this.touchPoints[this.touchNames[1]],
        );
      }
      return -1;
    },
    angle: function () {
      if (2 == this.touchNames.length) {
        var p1 = this.touchPoints[this.touchNames[0]];
        var p2 = this.touchPoints[this.touchNames[1]];
        return Math.atan2(p1.y - p2.y, p1.x - p2.x) / (Math.PI / 180);
      }
      return -1;
    },
  },
  methods: {
    onTouchBegin: function (evt) {
      if (!this.touchPoints[evt.touchPointID]) {
        this.$set(this.touchPoints, evt.touchPointID, new egret.Point(evt.stageX, evt.stageY));
        this.touchNames.push(evt.touchPointID);
      }
    },
    onTouchEnd: function (evt) {
      this.$delete(this.touchPoints, evt.touchPointID);
      var index = this.touchNames.indexOf(evt.touchPointID);
      this.touchNames.splice(index, 1);
    },
    onTouchMove: function (evt) {
      if (this.touchPoints[evt.touchPointID]) {
        this.$set(this.touchPoints, evt.touchPointID, new egret.Point(evt.stageX, evt.stageY));
      }
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="$stageWidth/2" :y="$stageHeight/2" :anchorOffsetX="anchorOffsetX" :anchorOffsetY="anchorOffsetY" :scaleX="scale" :scaleY="scale" :rotation="rotation" :texture="texture" touchEnabled @touchBegin="onTouchBegin" @touchEnd="onTouchEnd"></Bitmap>
    <TextField :x="$stageWidth/2-240" y="50" size="28" width="480" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>该示例需在移动端体验，使用双手指做捏合动作可缩放显示对象。双手指可旋转显示对象</TextField>
  </DisplayObjectContainer>`,
})
```

:::
