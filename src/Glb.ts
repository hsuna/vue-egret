export default class Glb {
    constructor(){
        this._created();
    }
    private _created(){
        this.beforeCreated();



        this.created();
    }
    private _destroyed(){
        this.beforeDestroyed();
        
        /* for(let i:void=0, len=this.$children.length-1; i>=0; i--){
            let child = this.$children[i];
            if(child){
                if(child instanceof uis.CSprite){
                    (child as uis.CSprite).dispose();
                }else if(child instanceof egret.MovieClip){
                    (child as egret.MovieClip).stop();
                }else if(child instanceof egret.Bitmap){
                    (child as egret.Bitmap).texture = null;
                }else if(child instanceof egret.TextField){
                    (child as egret.TextField).text = '';
                }
                child.$parent && this.removeChild(child);
                child = null;
            }
        } */
        this.destroyed();
    }
    public beforeCreated(){}
    public created() {}
    public beforeDestroyed() {}
    public destroyed() {}
}