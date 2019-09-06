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

var Main = class extends Glb {
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
} */

VueEgret.component('MyLabel', {
    data(){
        return {
            text: 'loading'
        }
    },
    methods: {
        
    },
    template: `<TextField textColor="#00FFFF" x="11" y="12">{{text}}</TextField>`
})

var Main = new VueEgret({
    data(){
        return {
            text: 'loading'
        }
    },
    methods: {
        onLabelClick(){
            this.text += '1'
        }
    },
    template: `<Sprite x="11" y="12">
        <MyLabel x="11" y="12" :text="text" @click="onLabelClick"></MyLabel>
    </Sprite>`
})
