---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 深度管理

显示对象的深度管理。

点击不同白鹭小鸟提升到最上层。

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      textX: 0,
      texture: null,
      items: [],
    };
  },
  mounted: function () {
    var self = this;
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var bmd = evt.currentTarget.data;
      var texture = new egret.Texture();
      texture.bitmapData = bmd;
      self.texture = texture;

      self.items.push(
        { x: self.$stageWidth / 2 - bmd.width / 2, y: self.$stageHeight / 2 - bmd.height / 2 },
        { x: self.$stageWidth / 2 - bmd.width - 40, y: self.$stageHeight / 2 - bmd.height / 2 },
        { x: self.$stageWidth / 2 + 40, y: self.$stageHeight / 2 - bmd.height / 2 },
      );
    });
    imgLoader.load('../resource/cartoon-egret_00.png');

    this.textX = this.$stageWidth / 2 - this.$refs['label'].width / 2;
  },
  methods: {
    onTouchTap: function (index) {
      var item = this.items.splice(index, 1);
      this.items.push(item[0]);
    },
  },
  template: `<DisplayObjectContainer>
      <Bitmap v-for="(item, index) in items" :x="item.x" :y="item.y" :texture="texture" touchEnabled pixelHitTest @touchTap="onTouchTap(index)"></Bitmap>
      <TextField ref="label" :x="textX" y="10" size="28" textAlign="left" textColor="0x843900" type="dynamic" lineSpacing="6" multiline>点击不同白鹭小鸟提升到最上层</TextField>
  </DisplayObjectContainer>`,
})
```

:::
