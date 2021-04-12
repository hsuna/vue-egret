---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 字体颜色

文本字体颜色设置。

触摸舞台更改文本字体颜色。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      colors: [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x0000ff, 0x800080],
      idx: 0,
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      this.idx = (this.idx + 1) % this.colors.length;
    },
  },
  template: `<DisplayObjectContainer>
    <TextField :x="$stageWidth/2-150" y="500" width="400" :textColor="colors[idx]">
        这是个文本颜色示例，
        请轻触更换文本颜色!
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
