---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 字体超链接

文本超级链接设置。

目前只支持事件响应，前提需要设置文本的`touchEnabled=true`。

点击有链接的文字会有 log 显示，点击没有链接的文字没有任何响应。

::: demo:type=example&background=#35414d&showLog=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      textFlow: [
        { text: '这段文字有链接', style: { href: 'event:text event triggered', underline: true } },
        { text: '\n这段文字没链接', style: { textColor: 0x999999 } },
      ],
    };
  },
  methods: {
    onLink: function (evt) {
      egret.log(evt.text);
    },
  },
  template: `<DisplayObjectContainer>
    <TextField :x="$stageWidth/2-108" y="500" :textFlow="textFlow" lineSpacing="20" touchEnabled @link="onLink"></TextField>
  </DisplayObjectContainer>`,
})
```

:::
