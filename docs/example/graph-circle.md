---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 画圆

绘制圆形矢量，点击舞台，会在点击位置出现一个随机圆。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawCircle, this);
    this.drawCircle();
  },
  methods: {
    drawCircle(evt) {
      var x = evt ? evt.stageX : this.$stageWidth / 2;
      var y = evt ? evt.stageY : this.$stageHeight / 2;

      var shape = this.$refs.shape;
      shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
      shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
      shape.graphics.drawCircle(x, y, Math.random() * 50 + 50);
      shape.graphics.endFill();
    },
  },
  template: `<DisplayObjectContainer>
      <Shape ref="shape"></Shape>
  </DisplayObjectContainer>`,
})
```

:::
