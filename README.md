# VueEgret

## 简介

`VueEgret`框架是基于MVVM的思想，将`Vue`的开发模式，复制到`egret`上，通过虚拟节点与`egret`显示对象的一一对应，来实现数据驱动。由于`VueEgret`是基于`egret`上的，所以需要额外引入`egret`相关的库

你可以这样使用它:

```js
var Main = VueEgret.classMain({
	data(){
        return {
			text: 'Hello Word!!!'
		}
	},
	methods: {
		onTextClick(){
			this.text = 'Text is Click'
		}
    },
	template: `<Sprite touchEnabled="true" @touchTap="onTextClick">
		<TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>
	</Sprite>`
})
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:2335
npm run dev

# build for production with minification
npm run build
```

关于webpack的使用，请参阅文档 [vue-egret-loader](http://git.3k.com/web/Tech/vue-egret-loader.git).
