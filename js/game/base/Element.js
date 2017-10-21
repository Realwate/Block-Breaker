define(["base/EventTarget", "Logger", "util"], function(EventTarget, Logger, util) {
    'use strict';
    class Element extends EventTarget {
        constructor(context) {
            super();
            this.context = context;
            this.step = 3;
            this.logger = Logger.getInstance();
            this.x = 0;
            this.y = 0;
            this.image = null;
        }
        loadImage(name) {
            if(!name.startsWith("/")){
                name = "/" + name;
            }
            this.image = this.context.imageCache[name];
            this.width = this.image.width;
            this.height = this.image.height;
        }
        changePosition({
            x,
            y
        }) {
            this.x = x;
            this.y = y;
        }
        getRect(item) {
            return [{
                x: item.x,
                y: item.y
            }, {
                x: item.x + item.width,
                y: item.y
            }, {
                x: item.x,
                y: item.y + item.height
            }, {
                x: item.x + item.width,
                y: item.y + item.height
            }, ]
        }
        //矩形交集
        getIntersect(b) {
            var a = this;
            var x = Math.max(a.x, b.x);
            var num1 = Math.min(a.x + a.width, b.x + b.width);
            var y = Math.max(a.y, b.y);
            var num2 = Math.min(a.y + a.height, b.y + b.height);
            if (num1 >= x && num2 >= y) {
                return {
                    x,
                    y,
                    width: num1 - x,
                    height: num2 - y
                }
            }
            return null;
        }
        collide(item) { //碰撞检测 Axis-Aligned Bounding Box
            var a = this.getRect(this)
            var b = this.getRect(item)
            return a[0].x < b[3].x && a[3].x > b[0].x && a[0].y < b[3].y && a[3].y > b[0].y
        }
        draw() {
            this.context.canvasContext.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        flipHorizontalDraw() { // 水平翻转
            this.context.canvasContext.save();
            this.context.canvasContext.translate(this.x + this.width, 0)
            this.context.canvasContext.scale(-1, 1);
            this.context.canvasContext.drawImage(this.image, 0, this.y, this.width, this.height)
            this.context.canvasContext.restore();
        }
    }
    return Element;
});
