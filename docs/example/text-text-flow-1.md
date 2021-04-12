---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 富文本（标准格式）

富文本标准格式使用方式。

::: demo:type=example&background=#35414d&showLog=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      textFlow: [
        { text: '妈妈再也不用担心我在', style: { size: 20 } },
        {
          text: 'Egret',
          style: { textColor: 0x336699, size: 60, strokeColor: 0x6699cc, stroke: 2 },
        },
        { text: '里说一句话不能包含', style: { fontFamily: '楷体' } },
        { text: '各种', style: { fontFamily: '楷体', underline: true } },
        { text: '五', style: { textColor: 0xff0000 } },
        { text: '彩', style: { textColor: 0x00ff00 } },
        { text: '缤', style: { textColor: 0xf000f0 } },
        { text: '纷', style: { textColor: 0x00ffff } },
        { text: '、\n' },
        { text: '大', style: { size: 56 } },
        { text: '小', style: { size: 16 } },
        { text: '不', style: { size: 26 } },
        { text: '一', style: { size: 34 } },
        { text: '、' },
        { text: '格', style: { italic: true, textColor: 0x00ff00 } },
        { text: '式', style: { size: 26, textColor: 0xf000f0 } },
        { text: '各', style: { italic: true, textColor: 0xf06f00 } },
        { text: '样的文字', style: { fontFamily: 'KaiTi' } }, //楷体
        { text: '了！' },
      ],
    };
  },
  template: `<DisplayObjectContainer>
    <TextField :x="$stageWidth/2-264" y="400" width="540" size="30" :textColor="0xffffff" :textFlow="textFlow" lineSpacing="40"></TextField>
  </DisplayObjectContainer>`,
})
```

:::
