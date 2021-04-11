---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 字体大小

文本字体大小设置。

触摸舞台更改文本字体大小。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      sizes: [12, 24, 30, 36, 48, 60],
      idx: 2,
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      this.idx = (this.idx + 1) % this.sizes.length;
    },
  },
  template: `<DisplayObjectContainer>
    <TextField :x="$stageWidth/2-240" y="500" width="480" :size="sizes[idx]">这是个文本字体示例，请轻触更换文本字体大小!</TextField>
  </DisplayObjectContainer>`,
})
```

:::
