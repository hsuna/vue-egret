---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 九宫格

九宫格又称九切片。根据UI边角特征切成九部分，其中保持四个角部分原始显示，对边框和中心部分进行维持图像原始品质的拉伸，从而获得风格统一且灵活可调尺寸的UI。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      CLIPS_START: 120,
      scale9Grid: new egret.Rectangle(84, 84, 572, 572),

      width: 0,
      height: 0,
      texture: null,
    };
  },
  computed: {
    L() {
      var GAP_UNIFIED = 10;
      return {
        GAP_UNIFIED: GAP_UNIFIED,
        W_UI_MAX: this.$stageWidth - GAP_UNIFIED * 2,
        H_UI_MAX: (this.$stageHeight - this.CLIPS_START - GAP_UNIFIED * 2) / 2,
        W_UI_MIN: 180,
        H_UI_MIN: 180,
      };
    },
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

      self.width = self.L.W_UI_MAX;
      self.height = self.L.H_UI_MIN;

      self.$tween(
        [
          ['to', { width: self.L.W_UI_MIN, height: self.L.H_UI_MAX }, 1000],
          ['to', { width: self.L.W_UI_MAX, height: self.L.H_UI_MIN }, 1000],
        ],
        self,
        { loop: true },
      );
    });
    imgLoader.load('../resource/dialog-bg.png');
  },
  template: `<DisplayObjectContainer> 
    <TextField x="50" y="50" :width="$stageWidth-100" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>
      上方UI使用了九宫格
      下方UI没有使用九宫格
    </TextField>
    <Bitmap :width="width" :height="height" :anchorOffsetX="width/2" :anchorOffsetY="height/2" :x="L.GAP_UNIFIED + L.W_UI_MAX / 2" :y="CLIPS_START + L.H_UI_MAX / 2" :texture="texture" :scale9Grid="scale9Grid"></Bitmap>
    <Bitmap :width="width" :height="height" :anchorOffsetX="width/2" :anchorOffsetY="height/2" :x="L.GAP_UNIFIED + L.W_UI_MAX / 2" :y="CLIPS_START + L.H_UI_MAX * 3 / 2 + L.GAP_UNIFIED" :texture="texture"></Bitmap>
  </DisplayObjectContainer>`,
})
```

:::
