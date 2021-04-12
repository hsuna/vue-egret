---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 帧动画

帧动画示例。

触摸舞台会重新播放。

播放过程中如果有帧事件，会触发`egret.MovieClipEvent.FRAME_LABEL`事件。在播放结束一次后会触发`egret.Event.LOOP_COMPLETE`事件。全部播放完全后，会触发`egret.Event.COMPLETE`事件。

::: demo:type=example&showLog=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      count: 0,
      movieClipData: '',
    };
  },
  mounted: function () {
    this.loadData('../resource/animation.png', egret.URLLoaderDataFormat.TEXTURE, function (evt) {
      var mcTexture = evt.currentTarget.data;
      this.loadData('../resource/animation.json', egret.URLLoaderDataFormat.TEXT, function (evt) {
        var mcData = JSON.parse(evt.currentTarget.data);
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        this.movieClipData = mcDataFactory.generateMovieClipData('attack');
        this.$nextTick(function () {
          this.$refs['role'].gotoAndPlay(1, 3);
          this.$stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageTap, this);
        });
      });
    });
  },
  methods: {
    onStageTap: function () {
      this.count = 0;
      this.$refs['role'].gotoAndPlay(1, 3);
    },
    onFrameLabel: function (evt) {
      egret.log('frameLabel:' + evt.frameLabel);
    },
    onLoopComplete: function (evt) {
      egret.log('play times:' + ++this.count);
    },
    onComplete: function (evt) {
      egret.log('play over!');
    },
    loadData: function (url, dataFormat, callback) {
      var loader = new egret.URLLoader();
      loader.addEventListener(egret.Event.COMPLETE, callback, this);
      loader.dataFormat = dataFormat;
      var request = new egret.URLRequest(url);
      loader.load(request);
    },
  },
  template: `<DisplayObjectContainer>
    <MovieClip 
      ref="role" 
      x="320" 
      y="720" 
      :movieClipData="movieClipData"
      @frame_label="onFrameLabel"
      @loopComplete="onLoopComplete"
      @complete="onComplete"
    ></MovieClip>
  </DisplayObjectContainer>`,
})
```

:::
