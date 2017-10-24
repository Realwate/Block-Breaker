define(["base/EventTarget", "Logger", "Configuration", "util"], function(EventTarget, Logger, config,util) {
    'use strict';
    class Element extends EventTarget {
        constructor(contextWrapper) {
            super();
            this.context = contextWrapper.getContext();
            this.logger = Logger.getInstance();
            this.image = null;
            var baseBuilder = config.getElementBuilder("base");
            this.step = baseBuilder.step;
            this.baseFrame = baseBuilder.frame;
        }
        setup({x=0,y=0,width,height,defaultImage}){
          width && (this.width = width)
          height && (this.height = height)
          defaultImage && this.loadImage(defaultImage);
          this.x = x;
          this.y = y;
        }
        getConfig(){
            return this.context.configuration;
        }
        loadOneImage(name){
            var image = this.context.getImage(name);
            if(image == null){
                this.logger.error("图片加载失败:",name)
            }
            this.image = image;
            this.width || (this.width = image.width);
            this.height || (this.height = image.height);
        }
        loadImage(name = this.defaultImageName ) {
            if(!name){
                this.logger.error("图片名称有误",name)
            }
            this.defaultImageName || (this.defaultImageName = name);

            this.imageNames = null;
            if(util.isArray(name)){ //多张切换
                this.imageNames = name;
                this.curImage = 0

                if(util.isObject(name = name[0])){
                    this.curFrame = name.frame || this.baseFrame;
                    name = name.name
                }
                
            }
            this.loadOneImage(name)
        }
        changeImageInFrame(name,frame){
        }
        changeImage(){
            if(util.isArray(this.imageNames)){
                if(this.curFrame--){
                    
                }else{
                    this.curImage = (this.curImage + 1) % this.imageNames.length;
                    var name = this.imageNames[this.curImage];
                    this.curFrame = name.frame || this.baseFrame;
                    if(util.isObject(name)){
                        name = name.name
                    }
                    this.loadOneImage(name);
                }
            }
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
        draw(options) {
            this.changeImage();

            this.context.save();
            if(options && options.flip){
                this.flipHorizontalDraw();
            }else{
                this.simpleDraw();
            }
            this.context.restore();
        }
        simpleDraw(){
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        flipHorizontalDraw() { // 水平翻转
            this.context.translate(this.x + this.width, 0)
            this.context.scale(-1, 1);
            this.context.drawImage(this.image, 0, this.y, this.width, this.height)
        }
    }
    return Element;
});
