---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 缓动过程方程

缓动控制函数`to`可以设置控制缓动过程的参数，这个参数是一个特定的插值计算方程，Egret已经提供了所有常见的27中缓动方程，均在egret.Ease类中。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      birdX: 0,
      birdY: 0,
      texture: null,

      locationIdx: -1,
      locations: [],

      easeIdx: -1,
      easeFunc: [
        'sineIn',
        'sineOut',
        'sineInOut',
        'backIn',
        'backOut',
        'backInOut',
        'circIn',
        'circOut',
        'circInOut',
        'bounceIn',
        'bounceOut',
        'bounceInOut',
        'elasticIn',
        'elasticOut',
        'elasticInOut',
        'quadIn',
        'quadOut',
        'quadInOut',
        'cubicIn',
        'cubicOut',
        'cubicInOut',
        'quartIn',
        'quartOut',
        'quartInOut',
        'quintIn',
        'quintOut',
        'quintInOut',
      ],
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
        /// 本例只提供左下与右上两个位置，便于观察缓动方程
        this.locations = [
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
      var lastVal = this.locationIdx;
      while (this.locationIdx == lastVal) {
        /// 避免与之前选择雷同
        this.locationIdx = Math.floor(Math.random() * this.locations.length);
      }

      var loc = this.locations[this.locationIdx];
      var ease = this.easeFunc[++this.easeIdx % this.easeFunc.length];
      /*** 本示例关键代码段开始 ***/
      this.$tween([['to', { birdX: loc.x, birdY: loc.y }, 600, egret.Ease[ease]]]);
      /*** 本示例关键代码段结束 ***/
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="birdX" :y="birdY" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
    <TextField :x="$stageWidth/2-240" y="50" size="28" width="480" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>
      轻触屏幕启动一个随机位置的缓动过程，每一次缓动依次使用不同的插值方程
      当前插值：{{easeFunc[easeIdx] ? 'egret.Ease.'+easeFunc[easeIdx] : ''}}
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
