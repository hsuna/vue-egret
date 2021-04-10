const HTML_TEMPLATE = ({ code, type, width, height }) => `<!DOCTYPE HTML>
<html>

<head>
    <meta charset="utf-8">
    <title>Egret</title>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="360-fullscreen" content="true" />
    <style>
        html, body {
            -ms-touch-action: none;
            background: #ffffff;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>
</head>

<body>
  <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
        data-entry-class="Main"
        data-orientation="auto"
        data-scale-mode="fixedHeight"
        data-frame-rate="30"
        data-content-width="${width || 740}"
        data-content-height="${height || 150}"
        data-show-paint-rect="false"
        data-multi-fingered="2"
        data-show-fps="false" data-show-log="false"
        data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
  </div>
  <script src="/vue-egret/lib/egret.min.js"></script>
  <script src="/vue-egret/lib/egret.web.min.js"></script>
  <script src="/vue-egret/lib/tween.min.js"></script>
  <script src="/vue-egret/lib/vue-egret.min.js"></script>
  <script>
    ${code}
      /**
       * {
       * "renderMode":, //Engine rendering mode, "canvas" or "webgl"
       * "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
       * "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
       * "calculateCanvasScaleFactor": //a function return canvas scale factor
       * }
       **/
      egret.runEgret({ renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor:function(context) {
          var backingStore = context.backingStorePixelRatio ||
              context.webkitBackingStorePixelRatio ||
              context.mozBackingStorePixelRatio ||
              context.msBackingStorePixelRatio ||
              context.oBackingStorePixelRatio ||
              context.backingStorePixelRatio || 1;
          return (window.devicePixelRatio || 1) / backingStore;
      }});
  </script>
</body>

</html>`;

export default ({ Vue }) => {
  Vue.component('DemoBlock', {
    props: {
      type: String,
      width: [String, Number],
      height: [String, Number],
      hideCode: String,
      code: String,
    },
    mounted() {
      this.$nextTick(() => {
        const iframe = this.$refs['iframe'];
        const win = iframe.contentWindow;
        const doc = iframe.contentDocument || win.document;
        doc.open();
        doc.write(
          HTML_TEMPLATE({
            ...this.$props,
            ...('example' === this.type
              ? {
                  width: 640,
                  height: 960,
                }
              : {}),
          }),
        );
        doc.close();
      });
    },
    render(h) {
      return h(
        'div',
        {
          class: {
            'demo-block': true,
            [`demo-block--${this.type}`]: this.type,
          },
        },
        [
          !this.hideCode && h('div', { class: "demo-block__code" }, this.$slots.source),
          h('div', { class: "demo-block__canvas" }, [
            h('iframe', {
              attrs: {
                width: '100%',
                height: this.height || '100%',
              },
              style: {
                border: 0,
              },
              ref: 'iframe',
            }),
          ]),
        ].filter(Boolean),
      );
    },
  });
};
