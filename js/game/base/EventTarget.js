define(["util"],function(util) {
    'use strict';

    class EventTarget{
        constructor(){
            this.eventListeners = {};
        }
        registerEvent(name,callback){
            if(this.eventListeners[name] == null){
                this.eventListeners[name] = {};
            }
            callback.__uuid = util.getUUID();
            this.eventListeners[name][callback.__uuid] = callback;
        }
        triggerEvent(name,args){
            var target = this.eventListeners[name];
            if(target != null){
              Object.keys(target).forEach((key)=>{
                var cb = target[key];
                cb &&　cb.call(this,args);
              })
            }
        }
        removeEventListener(name,cb){
          if(cb){
            var uuid = cb.__uuid;
            this.eventListeners[name][uuid] = null;
          }else{
            this.eventListeners[name] = null;
          }
        }
    }
    return EventTarget;
});
