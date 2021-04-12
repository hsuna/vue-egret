---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 动态帧频

在输入框中设置项目的帧频，点击舞台的时候设置项目的帧频

::: demo:type=example&showFps=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      text: '输入帧频',
      rotation: 0,
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
  },
  methods: {
    onFocusOut: function () {
      this.$stage.frameRate = Number(this.text);
    },
    onEnterFrame: function () {
      this.rotation += 3;
    },
    onChange: function (evt) {
      this.text = evt.target.text;
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onEnterFrame">
    <Bitmap :x="$stageWidth/2" :y="$stageHeight/2+50" :rotation="rotation" anchorOffsetX="114" anchorOffsetY="190" :texture="texture"></Bitmap>
    <TextField :x="$stageWidth/2-150" y="240" size="48" type="input" width="300" height="48" border borderColor="0x000000" textAlign="center" textColor="0x77787b" @change="onChange" @touchTap.stop="text = ''" @focusOut="onFocusOut">{{text}}</TextField>
    <TextField :x="$stageWidth/2-200" :y="$stageHeight-100" width="400" size="24" textAlign="center" textColor="0x843900">点击舞台的时候设置项目的帧频</TextField>
  </DisplayObjectContainer>`,
})
```

:::
