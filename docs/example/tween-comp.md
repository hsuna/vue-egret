---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 复合缓动

复合动画是Tween的重要特色。
 
不同的动画可以按照顺序通过链式调用依次连接循环调用。每次缓动调用结束时可以通过`$tween.then()`来进行该阶段的完成事件处理。不同的缓动之间可以通过`wait`来控制延迟时间。

按照本示例所示，开发者可以使用`vm.$tween`创建各种丰富而灵活的动画组合。

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
      rotCommon: 0,
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

        /// 本例只提供左下与右上两个位置，便于观察缓动方程
        this.locations = [
          new egret.Point(bmd.width / 2, 100 + bmd.height / 2),
          new egret.Point(this.$stageWidth - bmd.width / 2, this.$stageHeight - bmd.height / 2),
          new egret.Point(bmd.width / 2, this.$stageHeight - bmd.height / 2),
          new egret.Point(this.$stageWidth - bmd.width / 2, 100 + bmd.height / 2),
        ];
        this.rotCommon =
          (180 / Math.PI) *
          Math.atan2(
            this.locations[1].y - this.locations[0].y,
            this.locations[1].x - this.locations[0].x,
          );

        this.birdX = this.locations[3].x;
        this.birdY = this.locations[3].y;
        this.rotation = -90;

        this.launchTween();
      },
      this,
    );
    imgLoader.load('../resource/cartoon-egret_00.png');
  },
  methods: {
    launchTween: function (evt) {
      /*** 本示例关键代码段开始 ***/
      var getLoc = function (i, ctx) {
        return {
          birdX: ctx.locations[i].x,
          birdY: ctx.locations[i].y,
        };
      };
      this.$tween(
        [
          ['to', getLoc(0, this), 500],
          ['set', { rotation: 180 - this.rotCommon }],
          ['wait', 200],
          ['to', getLoc(1, this), 500],
          ['set', { rotation: -90 }],
          ['wait', 200],
          ['to', getLoc(2, this), 500],
          ['set', { rotation: this.rotCommon }],
          ['wait', 200],
          ['to', getLoc(3, this), 500],
          ['set', { rotation: -90 }],
          ['wait', 200],
        ],
        this,
        {
          loop: true,
        },
      );
      /*** 本示例关键代码段结束 ***/
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="birdX" :y="birdY" :rotation="rotation" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
    <TextField :x="$stageWidth/2-240" y="50" size="28" width="480" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>这是由四个阶段的缓动动画组成的复合动画，并且往复循环（您不需要接触屏幕！）</TextField>
  </DisplayObjectContainer>`,
})
```

:::
