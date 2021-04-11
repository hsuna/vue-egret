---
pageClass: example-page
prev: false
next: false
editLink: false
---

# 输入文本

输入文本示例。

点击输入文本，并会伴随获得焦点、失去焦点、输入过程中的事件响应。

::: demo:type=example&background=#35414d

```javascript

var Main = VueEgret.classMain({
  data: function () {
    return {
      text: '',
    };
  },
  methods: {
    onFocusIn: function () {
      this.text = '输入开始';  
    },
    onFocusOut: function () {
      this.text += '\n输入结束';
    },
    onChange: function (evt) {
      this.text = '输入开始：\n' + evt.target.text;
    },
  },
  template: `<DisplayObjectContainer>
    <TextField x="80" width="480" height="60" border borderColor="0x999999" verticalAlign="middle" type="input" @focusIn="onFocusIn" @focusOut="onFocusOut" @change="onChange">这是个单行输入文本示例</TextField>
    <TextField x="80" y="100" width="480" height="460" border borderColor="0x999999" multiline type="input" @focusIn="onFocusIn" @focusOut="onFocusOut" @change="onChange">这是个多行\n输入文本示例</TextField>
    <TextField x="80" y="600" width="480" textColor="0xffffff" size="18">{{text}}</TextField>
  </DisplayObjectContainer>`,
})
```

:::
