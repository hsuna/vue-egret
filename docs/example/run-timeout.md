---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 延迟调用

点击舞台，将会触发延迟调用，每个字符延迟150毫秒调用，实现打字机效果

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      isComplete: true,
    };
  },
  mounted: function () {
    this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
  },
  methods: {
    onTouchTap: function () {
      /*** 本示例关键代码段开始 ***/
      if (this.isComplete) {
        this.isComplete = false;
        this.typerEffect(
          this.$refs['text'],
          '\n每个字符延迟150毫秒调用，实现打字机效果',
          150,
          function () {
            this.isComplete = true;
          },
        );
      }
      /*** 本示例关键代码段结束 ***/
    },
    /**
     * 文字打字机效果
     * obj           文本对象
     * content       文字
     * interval      打字间隔 毫秒
     */
    typerEffect: function (obj, content, interval, backFun) {
      var strArr = content.split('');
      var len = strArr.length;
      var fun = function (i) {
        var self = this;
        return function () {
          obj.appendText(strArr[i]);
          if (i >= len - 1 && backFun != null) {
            backFun.call(self);
          }
        };
      };
      for (var i = 0; i < len; i++) {
        setTimeout(fun.call(this, i), interval * i);
      }
    },
  },
  template: `<DisplayObjectContainer>
    <TextField ref="text" x="30" y="30" size="24" textColor="0x000000" lineSpacing="10" multiline>
      延迟调用示例
      点击舞台显示效果
    </TextField>
  </DisplayObjectContainer>`,
})
```

:::
