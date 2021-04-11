---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 贝塞尔曲线

贝塞尔曲线示例。

拖动舞台上圆点，可以查看贝塞尔曲线不同的显示。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      shapes: {
        start: { x: 140, y: 400, color: 0xffff00 },
        control: { x: 340, y: 200, color: 0xff0000 },
        anchor: { x: 480, y: 500, color: 0x000ff0 },
      },
    };
  },
  mounted: function () {
    this.initGraphics();

    for (var ref in this.shapes) {
      this.initShape(ref, this.shapes[ref].color);
    }
  },
  methods: {
    initShape: function (ref, color) {
      var shape = this.$refs[ref][0];
      shape.graphics.beginFill(color);
      shape.graphics.drawCircle(0, 0, 20);
      shape.graphics.endFill();
    },
    initGraphics: function () {
      var shape = this.$refs['shape'];
      /*** 本示例关键代码段开始 ***/
      shape.graphics.lineStyle(3, 0xff0ff0);
      shape.graphics.moveTo(140, 400);
      shape.graphics.curveTo(340, 200, 480, 500);
      /*** 本示例关键代码段结束 ***/
    },
    resetCure: function () {
      var shape = this.$refs['shape'];
      /*** 本示例关键代码段开始 ***/
      shape.graphics.clear();
      shape.graphics.lineStyle(3, 0xff0ff0);
      shape.graphics.moveTo(this.shapes.start.x, this.shapes.start.y);
      shape.graphics.curveTo(
        this.shapes.control.x,
        this.shapes.control.y,
        this.shapes.anchor.x,
        this.shapes.anchor.y,
      );
      /*** 本示例关键代码段结束 ***/
    },
    onTouchBegin: function (item) {
      var self = this;
      var moveHandler = function (evt) {
        item.x = evt.stageX;
        item.y = evt.stageY;
        self.resetCure();
      };
      this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, moveHandler);
      this.$stage.once(egret.TouchEvent.TOUCH_END, function () {
        self.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, moveHandler);
      });
    },
  },
  template: `<DisplayObjectContainer>
      <Shape ref="shape"></Shape>
      <Shape v-for="(item, name) in shapes" :ref="name" :x="item.x" :y="item.y" touchEnabled @touchBegin.stop="onTouchBegin(item)"></Shape>
  </DisplayObjectContainer>`,
})
```

:::
