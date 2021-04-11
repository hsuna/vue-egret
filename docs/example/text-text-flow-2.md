---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 富文本（xml格式）

目前支持有：font、size、color/textcolor、stroke、strokeColor、fontFamily、href、bold/b、itatic/i、u

::: demo:type=example&background=#35414d&showLog=true

```javascript

var Main = VueEgret.classMain({
  data: function () {
    /*** 本示例关键代码段开始 ***/
    var str = '<font size=20>妈妈再也不用担心我在</font>'
      + '<font color=0x336699 size=60 strokecolor=0x6699cc stroke=2>Egret</font>'
      + '<font fontfamily="楷体">里说一句话不能包含</font>' 
      + '<font fontfamily="楷体"><u>各种</u></font>' 
      + '<font color=0xff0000>五</font>' 
      + '<font color=0x00ff00>彩</font>' 
      + '<font color=0xf000f0>缤</font>' 
      + '<font color=0x00ffff>纷</font>' 
      + '<font>、\n</font>' 
      + '<font size=56>大</font>' 
      + '<font size=16>小</font>' 
      + '<font size=26>不</font>' 
      + '<font size=34>一</font>' 
      + '<font>、</font>' 
      + '<font color=0x00ff00><i>格</i></font>' 
      + '<font size=26 color=0xf000f0>式</font>' 
      + '<font color=0xf06f00><i>各</i></font>' 
      + '<font fontfamily="KaiTi">样的文字</font>' //楷体
      + '<font>了！</font>' 
    return {
      textFlow: new egret.HtmlTextParser().parser(str)
    };
  },
  template: `<DisplayObjectContainer>
    <TextField :x="$stageWidth/2-264" y="400" width="540" size="30" :textColor="0xffffff" :textFlow="textFlow" lineSpacing="40"></TextField>
  </DisplayObjectContainer>`,
})
```

:::
