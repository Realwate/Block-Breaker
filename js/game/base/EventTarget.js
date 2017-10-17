define(function(util) {
    'use strict';

    class EventTarget{
        constructor(){
            this.events = {};
        }
        registerEvent(name,callback){
            if(this.events[name] == null){
                this.events[name] = [];
            }
            this.events[name].push(callback);
        }
        triggerEvent(name,args){
            var target = this.events[name];
            if(target != null){
                for(let cb of target){
                    cb.call(this,args);
                }
            }
        }
    }
    return EventTarget;
});
