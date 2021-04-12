---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 基本缓动

VueEgret提供的缓动库，从开发者角度设计API。使用力求精简。

使用`vm.$tween`方法对其值进行缓动控制。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      birdX: 0,
      birdY: 0,
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
      this.$tween([['to', { birdX: loc.x, birdY: loc.y }, 300, egret.Ease.sineIn]]);
      /*** 本示例关键代码段结束 ***/
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="birdX" :y="birdY" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
    <TextField :x="$stageWidth/2-240" y="50" size="28" width="480" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>轻触屏幕启动一个随机位置的缓动过程</TextField>
  </DisplayObjectContainer>`,
})
```

:::
