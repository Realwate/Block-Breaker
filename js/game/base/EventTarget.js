define(["util"],function(util) {
    'use strict';
    var tag = util.getTag();
    class EventTarget{
        constructor(){
            this.eventListeners = {};
        }
        registerEvent(name,handler){
            var handlers = this.eventListeners[name] || (this.eventListeners[name] = {})
            handler[tag] = util.getUUID();
            handlers[handler[tag]] = handler;
        }
        triggerEvent(name,args){
            var handlers = this.eventListeners[name];
            if(handlers != null){
              Object.values(handlers)
              .forEach((handler)=>{
                handler &&　handler.call(this,args);
              })
            }
        }
        removeEventListener(name,cb){
          if(cb){
            var uuid = cb[tag];
            this.eventListeners[name][uuid] = null;
          }else{
            this.eventListeners[name] = null;
          }
        }
    }
    return EventTarget;
});
