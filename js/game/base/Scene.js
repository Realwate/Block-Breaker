define(["base/Element", "base/EventTarget", "base/NativeEvent", "Logger", "util"],
    function (Element, EventTarget, NativeEvent, Logger, util) {
        'use strict';

        class Scene extends EventTarget {
            constructor(context) {
                super();
                this.context = context;
                this.actions = {};
                this.keydowns = {};
                this.elements = [];
                this.logger = Logger.getInstance();
                this.addNativeEventListener("keydown", (e) => {
                    this.keydowns[e.key] = true;
                })
                this.addNativeEventListener("keyup", (e) => {
                    this.keydowns[e.key] = false;
                })
            }
            addNativeEventListener(type, cb) {
                NativeEvent.add(this, type, cb);
            }
            removeNativeEventListener(type) {
                NativeEvent.remove(this, type);
            }
            replaceScene(scene) {
                this.context.game.replaceScene(scene);
            }
            registerAction(name, callback) {
                this.actions[name] = callback;
            }
            addElement(e) {
                this.elements.push(e);
            }
            draw() {
                this.triggerAction();
                this.context.canvasContext.clearRect(0, 0, this.context.width, this.context.height)
                this.elements.forEach(e => {
                    if (util.isArray(e)) {
                        for (let o of e) {
                            o.draw();
                        }
                    } else {
                        e.draw();
                    }
                });
            }
            triggerAction() {
                //遍历action 更改状态
                Object.keys(this.actions)
                    .forEach((key) => {
                        if (this.keydowns[key]) {
                            this.actions[key]();
                        }
                    })
            }
            destroy() {
                NativeEvent.remove(this);
            }
        }
        return Scene;
    });
