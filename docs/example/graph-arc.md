---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 圆弧

绘图api之画圆弧。

基于此api可以不仅仅画出圆弧，还可以绘制出拱形、扇形、花瓣等等。

轻触屏幕出现不同的花瓣形状。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      nums: [18, 15, 12, 10, 9, 6, 5, 4, 3],
      count: 0,
      items: [],
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.drawFl, this);
    this.drawFl();
  },
  watch: {
    items: function () {
      this.$nextTick(function () {
        for (var i = 0, len = this.items.length; i < len; i++) {
          var item = this.items[i];
          var shape = this.$refs['shape'][i];
          shape.graphics.clear();
          shape.graphics.lineStyle(2, item.color);
          shape.graphics.drawArc(item.x, item.y, item.radius, item.startAngle, item.endAngle, true);
        }
      });
    },
  },
  methods: {
    drawFl: function () {
      var num = this.nums[this.count++];
      this.count %= this.nums.length;

      var singleAng = 180 / num;
      var r1 = 150;
      var r2 = r1 * Math.sin((singleAng * Math.PI) / 180);
      var r3 = r1 * Math.cos((singleAng * Math.PI) / 180);

      var items = [];
      for (var i = 0; i < num; i++) {
        var ang = -singleAng / 2 + i * 2 * singleAng;
        items.push({
          x: r3 * Math.cos((ang * Math.PI) / 180),
          y: r3 * Math.sin((ang * Math.PI) / 180),
          radius: r2,
          startAngle: ((ang + 90) * Math.PI) / 180,
          endAngle: ((ang - 90) * Math.PI) / 180,
          color: 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100),
        });
      }
      this.items = items;
    },
  },
  template: `<DisplayObjectContainer>
      <Shape v-for="item in items" ref="shape" :x="$stageWidth/2" :y="$stageHeight/2"></Shape>
  </DisplayObjectContainer>`,
})
```

:::
