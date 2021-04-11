---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 矩形

绘制矩形api。

点击舞台，会在点击位置出现一个随机矩形。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawRect, this);
    this.drawRect();
  },
  methods: {
    drawRect(evt) {
      var x = evt ? evt.stageX : this.$stageWidth / 2;
      var y = evt ? evt.stageY : this.$stageHeight / 2;
      var w = Math.random() * 200 + 100;
      var h = Math.random() * 200 + 100;

      var shape = this.$refs.shape;
      /*** 本示例关键代码段开始 ***/
      shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
      shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
      shape.graphics.drawRect(x - w / 2, y - h / 2, w, h);
      shape.graphics.endFill();
      /*** 本示例关键代码段结束 ***/
    },
  },
  template: `<DisplayObjectContainer>
      <Shape ref="shape"></Shape>
  </DisplayObjectContainer>`,
})
```

:::
