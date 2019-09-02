var Main = class extends egret.Sprite {
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
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this._options.view

        var _textField = new egret.TextField;
        _textField.size = 16;
        _textField.textColor = 0;
        _textField.stroke = 1;
        _textField.strokeColor = 0xffffff;
        _textField.text = 'XXXXXXXXX';
        this.addChild(_textField);
    }
    _removedStageHandler(evt){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._addedStageHandler, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._removedStageHandler, this);
    }
}

class a extends egret.Sprite{
    constructor(){
        new Loading()
    }
}