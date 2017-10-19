define(["util"],function(util) {
  'use strict';

  var randomKey = `game${Date.now()}`;
  var getUUID = util.uuidFactory();
  class NativeEvent{
    constructor(){
      this.eventListeners = {}
    }
    dispatcher(e){
      var type = e.type;
      var typeListeners = this.eventListeners[type];
      Object.values(typeListeners)
      .forEach(targetListeners=>{
        for(let listener of targetListeners){
          listener(e);
        }
      })
    }
    add(target,type,cb){
      if(this.eventListeners[type] == null){
        this.eventListeners[type] = {};
        window.addEventListener(type,e => this.dispatcher(e) );
      }
      var extraData = target[randomKey];
      if(extraData == null){
        target[randomKey] = extraData = {
          uuid:getUUID(),
          events:{
          }
        };
      }
      var uuid = extraData.uuid;
      if(this.eventListeners[type][uuid] == null){
        this.eventListeners[type][uuid] = [];
      }
      extraData.events[type] = this.eventListeners[type][uuid] ;
      this.eventListeners[type][uuid].push(cb);
    }
    remove(target,type){
      var extraData = target[randomKey];
      if(extraData == null){ //未注册事件
        return;
      }
      if(type != null){ //移除指定type
        var typeListeners = this.eventListeners[type];
        var targetListeners = typeListeners[extraData.uuid];
        targetListeners.splice(0);
      }else{ //全部删除
        Object.values(extraData.events).forEach((listeners)=>{
          listeners.splice(0)
        })
      }
    }

    static getInstance(){
      return instance;
    }
  }

  var instance = new NativeEvent();

  return NativeEvent;
});
