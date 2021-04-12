---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 定时器

定时器示例，指针按照定时每次旋转6度，60秒旋转一周

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      text: '',
      rotation: 0,
      timer: null,
    };
  },
  mounted: function () {
    var circle = this.$refs['circle'];
    circle.graphics.lineStyle(5, 0x000000, 1, true);
    circle.graphics.drawCircle(0, 0, 170);
    circle.graphics.endFill();

    var pointer = this.$refs['pointer'];
    pointer.graphics.beginFill(0x000000);
    pointer.graphics.drawRect(0, 0, 160, 5);
    pointer.graphics.endFill();

    this.timer = new egret.Timer(1000, 0);
    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    this.timer.start();

    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStateTap, this);
  },
  methods: {
    onStateTap: function () {
      /*** 点击舞台的时候会调用延迟方法 ***/
      if (this.timer.running) {
        this.text = '定时器关闭！';
        this.timer.stop();
      } else {
        this.text = '定时器启动！';
        this.timer.start();
      }
    },
    timerFunc: function () {
      this.rotation += 6;
      if (this.rotation > 360) {
        this.rotation -= 360;
      }
    },
  },
  template: `<DisplayObjectContainer>
    <Shape ref="circle" :x="$stageWidth/2" :y="$stageHeight/2"></Shape>
    <Shape ref="pointer" :x="$stageWidth/2" :y="$stageHeight/2" anchorOffsetY="2.5" :rotation="rotation"></Shape>
    <TextField x="30" y="30" size="24" textColor="0x000000" lineSpacing="10" multiline>
      定时器示例
      点击舞台启动或者暂停定时器
      {{text}}
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
