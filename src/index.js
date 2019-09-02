import { parseString } from 'xml2js'

const vueEgretFactory = (BaseClass) => {
    return class extends BaseClass {
        constructor(options){
            super();
    
            this.init(this._options=options);
        }
        init(){
            if(this.stage){
                this._addedStageHandler(null);
            }else{
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this._addedStageHandler, this);
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._removedStageHandler, this);
        }
        _addedStageHandler(evt){
            parseString(`<Root>${this._options.template}</Root>`, {
                trim: true,
                charkey: '#',
                attrkey: '@',
            }, (err, xml) => {
                Object.keys(xml.Root).forEach(key => this._render(key, this))
            })
            this.created();
        }
        _removedStageHandler(evt){
            this.destroyed();
        }
        _render(p, target) {
            debugger;
            if('@' === p){
            }else if('#' === p){
                //this.text = 
            }else if(this._options.components[p]){
                const CmptClass = this._options.components[p]
                const cmpt = new CmptClass
                this.addChild(cmpt);
                
            }
        }
        created() {
    
        }
        destroyed() {
        } 
    }
}

const VueEgret = vueEgretFactory(egret.Sprite)

export default VueEgret