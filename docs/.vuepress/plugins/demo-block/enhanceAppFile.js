const HTML_TEMPLATE = ({
  code,
  background,
  entryClass = 'Main',
  orientation = 'auto',
  scaleMode = 'fixedWidth',
  frameRate = 30,
  width = 740,
  height = 150,
  showPaintRect = 'false',
  multiFingered = 2,
  showFps = 'false',
  showLog = 'false',
}) => `<!DOCTYPE HTML>
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
            background: ${background || '#ffffff'};
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>
</head>

<body>
  <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
        data-entry-class="${entryClass}"
        data-orientation="${orientation}"
        data-scale-mode="${scaleMode}"
        data-frame-rate="${frameRate}"
        data-content-width="${width}"
        data-content-height="${height}"
        data-show-paint-rect="${showPaintRect}"
        data-multi-fingered="${multiFingered}"
        data-show-fps="${showFps}"
        data-show-log="${showLog}"
        data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
  </div>
  <script src="/vue-egret/lib/egret.min.js"></script>
  <script src="/vue-egret/lib/egret.web.min.js"></script>
  <script src="/vue-egret/lib/tween.min.js"></script>
  <script src="/vue-egret/lib/game.min.js"></script>
  <script src="/vue-egret/lib/res.min.js"></script>
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
      code: String,
      type: String,
      hideCode: String,
    },
    mounted() {
      this.$nextTick(() => {
        const iframe = this.$refs['iframe'];
        const win = iframe.contentWindow;
        const doc = iframe.contentDocument || win.document;
        doc.open();
        doc.write(
          HTML_TEMPLATE({
            ...this.$attrs,
            ...('example' === this.type
              ? {
                  width: 640,
                  height: 960,
                }
              : {}),
            code: this.code,
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
          !this.hideCode && h('div', { class: 'demo-block__code' }, this.$slots.source),
          h('div', { class: 'demo-block__canvas' }, [
            h('iframe', {
              attrs: {
                width: '100%',
                height: this.$attrs.height || '100%',
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
