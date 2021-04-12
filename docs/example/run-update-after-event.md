---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 强制刷新

设置帧频为5，默认没有打开强制刷新，点击舞台切换是否强制刷新

::: demo:type=example&showFps=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      rotation: 0,
      texture: null,

      timer: null,
      isUpdate: false,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = evt.currentTarget.data;
      this.texture = texture;

      // 设置帧频
      this.$stage.frameRate = 5;
    }, this);
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTap, this);

    this.timer = new egret.Timer(50, 0);
    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    this.timer.start();
  },
  methods: {
    onStageTap: function () {
      this.isUpdate = !this.isUpdate;
    },
    timerFunc: function (evt) {
      this.rotation += 10;
      if (this.isUpdate) {
        evt.updateAfterEvent();
      }
    },
  },
  template: `<DisplayObjectContainer>
    <Bitmap :x="$stageWidth/2" :y="$stageHeight/2" :rotation="rotation" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
    <TextField x="240" y="30" size="24" textColor="0x000000" lineSpacing="10" multiline>
      设置帧频为5
      默认没有打开强制刷新
      点击舞台切换是否强制刷新：{{isUpdate?'是':'否'}}
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
