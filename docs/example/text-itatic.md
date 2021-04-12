---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 字体倾斜

文本字体斜体设置。

触摸舞台来查看倾斜后的效果。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      italic: false,
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      this.italic = !this.italic;
    },
  },
  template: `<DisplayObjectContainer> 
    <TextField :x="$stageWidth/2-200" y="500" width="400" :italic="italic">这是个文本斜体示例，请轻触更换文本是否倾斜!</TextField>
  </DisplayObjectContainer>`,
})
```

:::
