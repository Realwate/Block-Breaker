define(["util"], function(util) {
    'use strict';
    var tag = util.getTag();
    var getUUID = util.uuidFactory();
    class NativeEventSystem {
        constructor() {
            this.eventListeners = {}
        }
        dispatcher(e) {
            var type = e.type;
            var typeListeners = this.eventListeners[type];
            Object.values(typeListeners).forEach(handlers => {
                for (let handler of handlers) {
                    handler(e);
                }
            })
        }
        add(target, type, cb) {
            if (this.eventListeners[type] == null) {
                this.eventListeners[type] = {};
                window.addEventListener(type, e => this.dispatcher(e));
            }
            var extraData = target[tag] || (target[tag] = {
                uuid: getUUID(),
                events: {}
            });
            var uuid = extraData.uuid;
            if (this.eventListeners[type][uuid] == null) {
                this.eventListeners[type][uuid] = [];
            }
            extraData.events[type] = this.eventListeners[type][uuid];
            this.eventListeners[type][uuid].push(cb);
        }
        remove(target, type) {
            var extraData = target[tag];
            if (extraData == null) { //未注册事件
                return;
            }
            if (type != null) { //移除指定type
                var typeListeners = this.eventListeners[type];
                var handlers = typeListeners[extraData.uuid];
                handlers.splice(0);
            } else { //全部删除
                Object.values(extraData.events).forEach((listeners) => {
                    listeners.splice(0)
                })
            }
        }
    }
    var instance = new NativeEventSystem();
    return {
        add: instance.add.bind(instance),
        remove: instance.remove.bind(instance),
    }
});
