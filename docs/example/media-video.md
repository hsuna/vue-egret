---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 视频播放

视频播放，点击播放、暂停、停止、全屏可以对视频进行操作。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      video: null,

      pauseTime: 0,
      isPlaying: false,
      isFullscreen: false,
    };
  },
  mounted: function () {
    this.video = this.$refs['video'];
    this.video.load('../resource/trailer.mp4');
  },
  methods: {
    onEnded: function () {
      if (!this.isPlaying) return;
      console.log('播放结束');
      this.isPlaying = false;
    },
    onPlayTap: function () {
      if (this.video) {
        this.video.play(this.pauseTime, false);
        this.isPlaying = true;
      }
    },
    onStopTap: function () {
      if (this.video) {
        this.pauseTime = 0;
        this.video.pause();
        this.isPlaying = false;
      }
    },
    onPauseTap: function () {
      if (this.video) {
        this.pauseTime = this.video.position;
        this.video.pause();
        this.isPlaying = false;
      }
    },
    onFullscreenTap: function () {
      if (this.isPlaying) {
        this.isFullscreen = !this.isFullscreen;
      }
    },
    getTextAttr(enabled) {
      return {
        touchEnabled: enabled,
        textColor: enabled ? 0xffffff : 0x999999,
      };
    },
  },
  template: `<DisplayObjectContainer>
    <Video ref="video" x="100" y="200" width="427" height="240" 
      :fullscreen="isFullscreen"
      :poster="isFullscreen ? '../resource/posterfullscreen.jpg' : '../resource/posterinline.jpg'"
      @ended="onEnded"
    ></Video>
    <TextField x="110" y="500" size="40" v-bind="getTextAttr(!isPlaying)" @touchTap="onPlayTap">播放</TextField>
    <TextField x="222" y="500" size="40" v-bind="getTextAttr(isPlaying)" @touchTap="onStopTap">停止</TextField>
    <TextField x="334" y="500" size="40" v-bind="getTextAttr(isPlaying)" @touchTap="onPauseTap">暂停</TextField>
    <TextField x="446" y="500" size="40" v-bind="getTextAttr(isPlaying)" @touchTap="onFullscreenTap">全屏</TextField>
  </DisplayObjectContainer>`,
})
```

:::
