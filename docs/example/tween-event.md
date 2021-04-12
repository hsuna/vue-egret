---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 缓动产生事件

缓动是由一系列中间状态按顺序变化形成的，每一个中间状态可以产生一个更新事件，便于完成更丰富的功能，在`vm.$tween()`的第三个参数，即属性集合参数中可以定义更新事件。

属性集合是一个键值对集合，将更新事件分配给onChange键即可，如事件有其作用域要求，可以同时将作用域引用分配给onChangeObj键。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      birdX: 0,
      birdY: 0,
      rotation: 0,
      texture: null,

      locations: [],
      randomVal: -1,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(
      egret.Event.COMPLETE,
      function (evt) {
        /// 将图像显示出来
        var bmd = evt.currentTarget.data;
        var texture = new egret.Texture();
        texture.bitmapData = bmd;
        this.texture = texture;

        this.birdX = this.$stageWidth / 2;
        this.birdY = this.$stageHeight / 2;
        /// 设计几个位置便于运动
        this.locations = [
          new egret.Point(bmd.width / 2, 100 + bmd.height / 2),
          new egret.Point(this.$stageWidth - bmd.width / 2, this.$stageHeight - bmd.height / 2),
          new egret.Point(bmd.width / 2, this.$stageHeight - bmd.height / 2),
          new egret.Point(this.$stageWidth - bmd.width / 2, 100 + bmd.height / 2),
        ];
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
      },
      this,
    );
    imgLoader.load('../resource/cartoon-egret_00.png');
  },
  methods: {
    onTouchTap: function (evt) {
      var lastVal = this.randomVal;
      while (this.randomVal == lastVal) {
        this.randomVal = Math.floor(Math.random() * this.locations.length);
      }
      var loc = this.locations[this.randomVal];
      /*** 本示例关键代码段开始 ***/
      this.$tween([['to', { birdX: loc.x, birdY: loc.y }, 300, egret.Ease.sineIn]], this, {
        onChange: this.onFuncChange,
        onChangeObj: this,
      });
      /*** 本示例关键代码段结束 ***/
    },
    onFuncChange() {
      var iDirection = Math.random() > 0.5 ? -1 : 1; /// 随机方向
      this.rotation += 6 * iDirection;
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="birdX" :y="birdY" :rotation="rotation" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
    <TextField :x="$stageWidth/2-240" y="50" size="28" width="480" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>轻触屏幕启动一个随机位置的缓动过程，每一次缓动变化将会伴随某一方向的旋转</TextField>
  </DisplayObjectContainer>`,
})
```

:::
