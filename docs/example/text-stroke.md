---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 文本描边

文本描边设置，通过设置 stroke 以及 strokeColor 来设置描边的粗细、颜色。

触摸舞台更改文本字体描边粗细以及颜色值。

::: demo:type=example&background=#35414d

```javascript
var Main = VueEgret.classMain({
  data: function () {
    return {
      sizes: [
        [1, 0xff0000],
        [2, 0xffff00],
        [2.5, 0xff00ff],
        [3, 0x00ff00],
        [6, 0xff0000],
        [0, 0xff0000],
      ],
      idx: 0,
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
    <TextField :x="$stageWidth/2-165" y="500" lineSpacing="20" :stroke="sizes[idx][0]" :strokeColor="sizes[idx][1]">这是个文本描边示例，\n请轻触更换文本描边数值!</TextField>
  </DisplayObjectContainer>`,
});
```

:::
