---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 字体加粗

文本字体加粗设置。

触摸舞台来查看加粗后的效果。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      bold: false,
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      this.bold = !this.bold;
    },
  },
  template: `<DisplayObjectContainer> 
    <TextField :x="$stageWidth/2-200" y="500" width="400" :bold="bold">这是个文本粗体示例，请轻触更换文本是否加粗!</TextField>
  </DisplayObjectContainer>`,
})
```

:::
