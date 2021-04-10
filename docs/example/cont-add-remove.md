---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 添加与删除显示对象

向一个容器中添加或者删除一个显示对象。

整个示例分四个区域，如果当前区域有对象点击则移除，如果没有显示对象则添加一个显示对象。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      offsetX: 0,
      offsetY: 0,
      textX: 0,
      texture: null,
      visibles: [false, false, false, false],
    };
  },
  computed: {
    items: function () {
      return [
        { bg: 0xf7acbc, x: 0, y: 0 },
        { bg: 0xdeab8a, x: this.$stageWidth / 2, y: 0 },
        { bg: 0xef5b9c, x: 0, y: this.$stageHeight / 2 },
        { bg: 0xfedcbd, x: this.$stageWidth / 2, y: this.$stageHeight / 2 },
      ];
    },
  },
  mounted: function () {
    var self = this;
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = evt.currentTarget.data;
      self.texture = texture;

      self.offsetX = self.$stageWidth / 4 - texture.bitmapData.width / 2;
      self.offsetY = self.$stageHeight / 4 - texture.bitmapData.height / 2;
    });
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.textX = this.$stageWidth / 2 - this.$refs['label'].width / 2;

    for (var i = 0, len = this.items.length; i < len; i++) {
      var shape = this.$refs['shape'][i];
      shape.graphics.beginFill(this.items[i].bg);
      shape.graphics.drawRect(0, 0, this.$stageWidth / 2, this.$stageHeight / 2);
      shape.graphics.endFill();
    }
  },
  methods: {
    onTouchTap: function (index) {
      this.$set(this.visibles, index, !this.visibles[index]);
    },
  },
  template: `<DisplayObjectContainer>
      <template v-for="(item, index) in items">
        <Shape ref="shape" :x="item.x" :y="item.y" touchEnabled @touchTap="onTouchTap(index)"></Shape>
        <Bitmap :x="item.x+offsetX" :y="item.y+offsetY" :texture="texture" v-if="visibles[index]"></Bitmap>
      </template>
      <TextField ref="label" :x="textX" y="10" size="28" textAlign="left" textColor="0x843900" type="dynamic" lineSpacing="6" multiline>点击不同色块</TextField>
  </DisplayObjectContainer>`,
})
```

:::
