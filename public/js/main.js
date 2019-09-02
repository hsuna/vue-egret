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


var Main = new VueEgret({
    data(){
        return {
            scenes: 'loading'
        }
    },
    methods: {
        
    },
    components: {
        Sprite: egret.Sprite,
        TextField: egret.TextField,
    },
    template: `<Sprite x="11" y="12">
        <TextField x="11" y="12">{{scenes}}</TextField>
    </Sprite>`
})