---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 位图字体

位图字体为游戏UI、特效或者有特殊美术需求的文字提供了完全自定义的实现方式。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      font: null,
      phraseIdx: 0,
      phraseList: [
        'No pain no gain!',
        "Let's change the subject!",
        "Don't make up a story.",
        'He is a fast talker.',
        'You have my word!',
        'What brought you here?',
      ],
    };
  },
  mounted: function () {
    /*** 本示例关键代码段开始 ***/
    RES.getResByUrl(
      '../resource/cartoon-font.fnt',
      this.onLoadComplete,
      this,
      RES.ResourceItem.TYPE_FONT,
    );
  },
  methods: {
    onLoadComplete: function (font) {
      this.font = font;

      /// 轻触舞台以改变位图文本所用文字
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateBitmapTextContent, this);
    },
    updateBitmapTextContent() {
      if (this.phraseIdx + 1 < this.phraseList.length) {
        this.phraseIdx += 1;
      } else {
        this.phraseIdx = 0;
      }
    },
  },
  template: `<DisplayObjectContainer> 
    <BitmapText x="50" y="300" :font="font" >{{phraseList[phraseIdx]}}</BitmapText>
    <TextField x="50" y="50" :width="$stageWidth-100" size="28" textAlign="left" textColor="0x000000" type="dynamic" lineSpacing="6" multiline>
      以下文本是位图字体生成
      轻触舞台以改变位图文本所用文字
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
