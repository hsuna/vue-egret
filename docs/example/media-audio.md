---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 声音播放

声音播放demo。

可以通过点击播放、暂停、结束来对声音进行控制，并可以在进度条中查看对应播放进度。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      sound: '',
      channel: null,
      progressMask: null,
      pauseTime: 0,
      position: 0,
      isInit: false,
      isPlaying: false,
    };
  },
  mounted: function () {
    this.sound = new egret.Sound();
    //sound 加载完成监听
    this.sound.once(
      egret.Event.COMPLETE,
      function () {
        this.isInit = true;
      },
      this,
    );
    this.sound.load('../resource/ccnn.mp3');

    var bg = this.$refs['bg'];
    bg.graphics.beginFill(0x999999);
    bg.graphics.drawRoundRect(0, 0, 400, 10, 5, 5);
    bg.graphics.endFill();

    var progress = this.$refs['progress'];
    progress.graphics.beginFill(0xffff00);
    progress.graphics.drawRoundRect(0, 0, 400, 10, 5, 5);
    progress.graphics.endFill();

    var bar = this.$refs['bar'];
    bar.graphics.beginFill(0xffff00);
    bar.graphics.drawCircle(0, 0, 20);
    bar.graphics.endFill();
  },
  methods: {
    onPlayTap: function () {
      //sound 播放会返回一个 SoundChannel 对象，暂停、音量等操作请控制此对象
      this.channel = this.sound.play(this.pauseTime, 1);
      this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);

      this.isPlaying = true;
    },
    onStopTap: function () {
      this.pauseTime = 0;
      if (this.channel) {
        this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
        this.channel.stop();
        this.channel = null;
      }
      this.onTimeUpdate();
      this.isPlaying = false;
    },
    onPauseTap: function () {
      if (this.channel) {
        this.pauseTime = this.channel.position;
        this.channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onComplete, this);
        this.channel.stop();
        this.channel = null;
      }
      this.isPlaying = false;
    },
    onTimeUpdate: function () {
      if (!this.isPlaying) return;

      this.position = this.channel ? this.channel.position : 0;
      var w = (this.position / this.sound.length) * 400;
      this.progressMask = new egret.Rectangle(w, 0, 400 - w, 60);
    },
    getTextAttr(enabled) {
      enabled = this.isInit && enabled;
      return {
        touchEnabled: enabled,
        textColor: enabled ? 0xffffff : 0x999999,
      };
    },
  },
  template: `<DisplayObjectContainer @enterFrame="onTimeUpdate">
  <TextField x="80" y="400" size="60" v-bind="getTextAttr(!isPlaying)" @touchTap="onPlayTap">播放</TextField>
  <TextField x="260" y="400" size="60" v-bind="getTextAttr(isPlaying)" @touchTap="onStopTap">停止</TextField>
  <TextField x="440" y="400" size="60" v-bind="getTextAttr(isPlaying)" @touchTap="onPauseTap">暂停</TextField>
  <Shape ref="bg" :x="$stageWidth/2-200" y="295"></Shape>
  <Shape ref="progress" :x="$stageWidth/2-200" y="295" :mask="progressMask"></Shape>
  <Shape ref="bar" :x="$stageWidth/2-200+(position/sound.length)*400" y="300"></Shape>
  <TextField :x="$stageWidth/2-100" y="250" width="200" size="30" textAlign="center" @touchTap="onPauseTap">
    {{position.toFixed(1)}}/{{sound.length.toFixed(1)}}
  </TextField>
  </DisplayObjectContainer>`,
})
```

:::
