define(["base/GameItem"],function(GameItem) {
    'use strict';
    
    class Scene{
        constructor(context){
            this.context = context;
            this.actions = {};
            this.keydowns = {};
            this.events = {};
            window.addEventListener("keydown",(e)=>{
                this.keydowns[e.key] = true;
            })
            window.addEventListener("keyup",(e)=>{
                this.keydowns[e.key] = false;
            })
        }
        static init(context){
            return new this(context);
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
        draw(){
            //遍历action 更改状态
            Object.keys(this.actions)
            .forEach((key)=>{
                if(this.keydowns[key]){
                    this.actions[key]();
                }
            })
            this.context.canvasContext.clearRect(0,0,this.context.width,this.context.height)      
        }
        destroy(){
            this.actions = {};
            this.keydowns = {};
            this.events = {};
        }
       
    }

    return Scene;
});