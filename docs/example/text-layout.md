---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 文本布局

文本对齐方式，可以通过`egret.HorizontalAlign`以及`egret.VerticalAlign`来分别设置文本的水平对齐以及垂直对齐方式。

触摸舞台来查看不同的对齐方式的效果。

::: demo:type=example&background=#35414d

```javascript
var Main = VueEgret.classMain({
  data: function () {
    return {
      hAlignTexts: [
        { type: 'left', text: '水平对齐：左对齐' },
        { type: 'center', text: '水平对齐：居中对齐' },
        { type: 'right', text: '水平对齐：右对齐' },
      ],
      vAlignTexts: [
        { type: 'top', text: '垂直对齐：顶对齐' },
        { type: 'middle', text: '垂直对齐：居中对齐' },
        { type: 'bottom', text: '垂直对齐：底对齐' },
      ],
      hAlignIndex: 1,
      vAlignIndex: 1,
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      var hLen = this.hAlignTexts.length,
        vLen = this.vAlignTexts.length;
      var index = (this.hAlignIndex * hLen + this.vAlignIndex + 1) % (hLen * vLen);
      this.hAlignIndex = Math.floor(index / hLen);
      this.vAlignIndex = index % vLen;
    },
  },
  template: `<DisplayObjectContainer>
    <TextField 
      :width="$stageWidth" 
      :height="$stageHeight" 
      lineSpacing="10" 
      :textAlign="hAlignTexts[hAlignIndex].type"
      :verticalAlign="vAlignTexts[vAlignIndex].type"
    > 
      {{hAlignTexts[hAlignIndex].text}}
      {{vAlignTexts[vAlignIndex].text}}
      请轻触舞台更换对齐方式
    </TextField>
  </DisplayObjectContainer>`,
});
```

:::
