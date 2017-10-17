define(["base/GameItem","util"],function(GameItem,util) {
    'use strict';

    class Scene{
        constructor(context){
            this.context = context;
            this.actions = {};
            this.keydowns = {};
            this.events = {};
            this.elements = [];
            window.addEventListener("keydown",(e)=>{
                this.keydowns[e.key] = true;
            })
            window.addEventListener("keyup",(e)=>{
                this.keydowns[e.key] = false;
            })
        }
        replaceScene(scene){
            this.context.game.replaceScene(scene);
        }
        registerAction(name,callback){
            this.actions[name] = callback;
        }
        registerEvent(name,callback){
            this.events[name] = callback;
        }
        triggerEvent(name){
            var cb = this.events[name] ;
            cb && cb();
        }
        addElement(e){
            this.elements.push(e);
        }
        draw(){
          this.update(); 
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
        update(){
             //遍历action 更改状态
             Object.keys(this.actions)
             .forEach((key)=>{
                 if(this.keydowns[key]){
                     this.actions[key]();
                 }
             })
        }
        destroy(){

        }
    }
    return Scene;
});
