define(["base/GameItem"],function(GameItem) {
    'use strict';
    
    class Scene{
        constructor(context){
            this.context = context;
            this.actions = {};
            this.keydowns = {};
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
        draw(){
            //遍历action 更改状态
            Object.keys(this.actions)
            .forEach((key)=>{
                if(this.keydowns[key]){
                    this.actions[key]();
                }
            })
        }
        destroy(){
            this.actions = {};
            this.keydowns = {};
        }
       
    }

    return Scene;
});