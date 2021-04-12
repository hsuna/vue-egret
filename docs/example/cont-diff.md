---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 容器的使用

区分两个不同的容器

点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动

::: demo:type=example

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      dragType: 'none',
      dragData: {
        left: {
          isDrag: false,
          x: 0,
          y: 200,
        },
        right: {
          isDrag: false,
          x: 0,
          y: 200,
        },
      },
      texture: null,
    };
  },
  mounted: function () {
    var imgLoader = new egret.ImageLoader();
    imgLoader.once(egret.Event.COMPLETE, function (evt) {
      /// 将图像显示出来
      var texture = new egret.Texture();
      texture.bitmapData = evt.currentTarget.data;
      this.texture = texture;
    }, this);
    imgLoader.load('../resource/cartoon-egret_01.png');

    this.dragData.left.x = (this.$stageWidth / 4) * 1 - 125;
    this.dragData.right.x = (this.$stageWidth / 4) * 3 - 125;
    this.drawCage('leftCage', 0xd71345);
    this.drawCage('rightCage', 0x102b6a);
  },
  methods: {
    onTouchBegin: function (name) {
      this.dragData[name].isDrag = true;
    },
    onTouchEnd: function (name) {
      this.dragData[name].isDrag = false;
    },
    onTouchMove: function (name, evt) {
      if (this.dragData[name].isDrag) {
        this.dragData[name].x = evt.stageX - 125;
        this.dragData[name].y = evt.stageY - 125;
      }
    },
    onTouchTap: function (index) {
      var item = this.items.splice(index, 1);
      this.items.push(item[0]);
    },
    drawCage: function (ref, color) {
      var cage = this.$refs[ref][0];
      cage.graphics.lineStyle(10, color, 1, true);
      cage.graphics.lineTo(0, 0);
      cage.graphics.lineTo(250, 0);
      cage.graphics.lineTo(250, 250);
      cage.graphics.lineTo(0, 250);
      cage.graphics.lineTo(0, 0);
      cage.graphics.endFill();
    },
  },
  template: `<DisplayObjectContainer>
      <Bitmap v-if="dragType=='none'" :x="$stageWidth/2-75" :y="$stageHeight/2+50" :texture="texture" :touchEnabled="false"></Bitmap>
      <TextField :x="$stageWidth/4*1-60" y="120" width="120" size="28" textAlign="center" textColor="0xffffff" background backgroundColor="0xd71345" touchEnabled @touchTap="dragType='left'">红色容器</TextField>
      <TextField :x="$stageWidth/4*3-60" y="120" width="120" size="28" textAlign="center" textColor="0xffffff" background backgroundColor="0x102b6a" touchEnabled @touchTap="dragType='right'">蓝色容器</TextField>
      <DisplayObjectContainer 
        v-for="name in ['left', 'right']"
        :x="dragData[name].x" 
        :y="dragData[name].y" 
        :touchEnabled="dragType==name"
        @touchBegin="onTouchBegin(name)"
        @touchEnd="onTouchEnd(name)"
        @touchMove="onTouchMove(name, $event)"
      >
        <Shape :ref="name+'Cage'"></Shape>
        <Bitmap v-if="dragType==name" :x="125-75" :y="125-125" :texture="texture" :touchEnabled="false"></Bitmap>
      </DisplayObjectContainer>
      <TextField :x="$stageWidth/2-275" y="10" width="550" size="28" textAlign="center" textColor="0x000000" lineSpacing="6" multiline>点击不同颜色按钮，将白鹭小鸟放到不同的容器中，拖动容器小鸟随着容器移动</TextField>
  </DisplayObjectContainer>`,
})
```

:::
