---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 画线

绘制直线api。

点击舞台，会在随机出现由线组成的锥形。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawCone, this);
    this.drawCone();
  },
  methods: {
    drawCone() {
      var array = [
        { x: 320 - 200, y: 400 },
        { x: 320 + 200, y: 400 },
        { x: Math.random() * 300 + 180, y: 200 },
        { x: Math.random() * 300 + 180, y: 600 }
      ];

      var shape = this.$refs.shape;
      shape.graphics.clear();

      for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array.length; j++) {
          shape.graphics.lineStyle(2, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
          shape.graphics.moveTo(array[i]['x'], array[i]['y']);
          shape.graphics.lineTo(array[j]['x'], array[j]['y']);
        }
      }
    },
  },
  template: `<DisplayObjectContainer>
      <Shape ref="shape"></Shape>
  </DisplayObjectContainer>`,
})
```

:::
