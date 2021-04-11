---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 纹理集

一个纹理集可以包含若干图片的纹理，可以理解为一个图片库。
 
其中每一个图片都包含一个ID，当使用白鹭官方的纹理集生成工具TextureMerger制作纹理集时，默认将图片的主文件名作为其在纹理集中的ID。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      birds: [],
    };
  },
  mounted: function () {
    /*** 本示例关键代码段开始 ***/
    RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
    RES.loadConfig('../resource/bitmap-prac-atlas.res.json', '../resource/');
  },
  methods: {
    onConfigComplete: function () {
      RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
      RES.loadGroup('preload');
    },
    onGroupComplete: function () {
      for (var i = 0; i < 4; ++i) {
        this.birds.push({
          x: 0,
          y: 0,
          texture: RES.getRes('atlas.cartoon-egret_0' + i + '_small'),
        });
      }

      /// 轻触舞台以改变位图文本所用文字
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
      this.onTouchTap();
    },
    onTouchTap() {
      for (var i = 0, len = this.birds.length; i < len; i++) {
        var bird = this.birds[i];
        var wHalfBird = bird.texture.textureWidth / 2;
        var hHalfBird = bird.texture.textureHeight / 2;
        bird.x = wHalfBird + (this.$stageWidth - wHalfBird * 2) * Math.random();
        bird.y = hHalfBird + (this.$stageHeight - hHalfBird * 2) * Math.random();
      }
    },
  },
  template: `<DisplayObjectContainer> 
    <Bitmap v-for="bird in birds" :x="bird.x" :y="bird.y" :texture="bird.texture"></Bitmap>
    <TextField x="50" y="50" :width="$stageWidth-100" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" wordWrap multiline>这些散落的图片均来自于同一张作为纹理集的PNG图片。轻触以改变位置</TextField>
  </DisplayObjectContainer>`,
})
```

:::
