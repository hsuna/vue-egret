/* var Main = class extends egret.Sprite {
    constructor() {
        super()
        this.init()
    }

    init(){
        var sp = new egret.Sprite;
        this.addChild(sp);
        sp.graphics.beginFill(0xff0000)
        sp.graphics.drawRect(0,0,100,30)
        sp.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
            console.log('-=-==-=')
        },sp)
    }
} 
 */

/* class Glb {
    constructor() {
        this.__created();
    }
    __created() {
        this.beforeCreated();



        this.created();
    }
    __destroyed() {
        this.beforeDestroyed();

        for (let i = 0, len = this.$children.length - 1; i >= 0; i--) {
            let child = this.$children[i];
            if (child) {
                if (child instanceof uis.CSprite) {
                    (child as uis.CSprite).dispose();
                } else if (child instanceof egret.MovieClip) {
                    (child as egret.MovieClip).stop();
                } else if (child instanceof egret.Bitmap) {
                    (child as egret.Bitmap).texture = null;
                } else if (child instanceof egret.TextField) {
                    (child as egret.TextField).text = '';
                }
                child.$parent && this.removeChild(child);
                child = null;
            }
        }

        this.destroyed();
    }
    beforeCreated() {}
    created() {}
    beforeDestroyed() {}
    destroyed() {}
}

var Main = class extends egret.Sprite {
    testX = 10
    testY = 10
    constructor() {
        super()
    }
    handlerTap() {
        this.testX++
    }
    render() {
        return [{
            tag: egret.Sprite,
            attrs: {
                x: this.testX,
                y: this.testY
            },
            events: {
                'touchTap': this.handlerTap()
            },
            children: [{
                tag: egret.TextField,
                attrs: {
                    x: 0,
                    y: 0,
                    size: 16,
                    textColor: 0,
                    stroke: 1,
                    strokeColor: 0xffffff,
                    text: 'XXXXXXXXX'
                }
            }]
        }]
    }
}  */

VueEgret.component('MyLabel', {
    data(){
        return {
            text1: 'loading'
        }
    },
    methods: {
        onLabelClick(){
            this.text1 += '1'
        }
    },
    template: `<TextField touchEnabled="true" textColor="#00FFFF" x="11" y="12" @touchTap="onLabelClick">{{text1+text1}}</TextField>`
})

var Main = VueEgret.classFactory({
    data(){
        return {
            count: 0,
            list: []
        }
    },
    methods: {
        onLabelClick(){
            this.count += 1
            this.list.push(this.count)
        }
    },
    template: `<Sprite x="11" y="12">
        <Sprite v-for="(value, key) in list" x="11" y="40">
            <TextField textColor="#FF00FF" :x="key*75" y="75">{{value}}</TextField>
        </Sprite>
        <TextField textColor="#FF00FF" x="0" y="0" touchEnabled="true" @touchTap="onLabelClick">{{count+count}}</TextField>
        <MyLabel v-if="count<3" x="11" y="90"></MyLabel>
        <MyLabel v-else-if="count<10" x="11" y="180"></MyLabel>
        <MyLabel v-else x="11" y="270"></MyLabel>
    </Sprite>`
})