define(["base/GameItem","base/EventTarget","NativeEvent","util"],function(GameItem,EventTarget,NativeEvent,util) {
    'use strict';

    class Scene extends EventTarget{
        constructor(context){
            super();
            this.context = context;
            this.actions = {};
            this.keydowns = {};
            this.elements = [];
            this.nativeEvent = NativeEvent.getInstance();
            this.logger = util.getLogger();
            this.addNativeEventListener("keydown",(e)=>{
                this.keydowns[e.key] = true;
            })
            this.addNativeEventListener("keyup",(e)=>{
                this.keydowns[e.key] = false;
            })
        }
        addNativeEventListener(type,cb){
          this.nativeEvent.add(this,type,cb);
        }
        removeNativeEventListener(type){
            this.nativeEvent.remove(this,type);
        }
        replaceScene(scene){
            this.context.game.replaceScene(scene);
        }
        registerAction(name,callback){
            this.actions[name] = callback;
        }
        addElement(e){
            this.elements.push(e);
        }
        draw(){
          this.triggerAction();
            this.context.canvasContext.clearRect(0,0,this.context.width,this.context.height)
            this.elements.forEach(e=>{
                if(util.isArray(e)){
                   for(let o of e){
                        o.draw();
                   }
                }else{
                    e.draw();
                }
            });
        }
        triggerAction(){
             //遍历action 更改状态
             Object.keys(this.actions)
             .forEach((key)=>{
                 if(this.keydowns[key]){
                     this.actions[key]();
                 }
             })
        }
        destroy(){
            this.nativeEvent.remove(this);
        }
    }
    return Scene;
});
