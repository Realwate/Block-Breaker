define(function() {
    'use strict';

    class GameItem {
        constructor(context){
            this.context = context;
            this.step = 3;
            this.x = 0;
            this.y = 0;
            this.image = new Image();
            this.imageCache = {};
        }
         loadImage(name){
           this.image = this.context.imageCache[name];
        }
        static getRect(item){
            return [
                {x:item.x,y:item.y},
                {x:item.x + item.image.width,y:item.y},
                {x:item.x,y:item.y + item.image.height},
                {x:item.x + item.image.width,y:item.y + item.image.height},
            ]
        }
        collide(item){ //碰撞检测 Axis-Aligned Bounding Box
            var a = GameItem.getRect(this)
            var b = GameItem.getRect(item)
            
            return a[0].x < b[3].x && a[3].x > b[0].x
            && a[0].y < b[3].y && a[3].y > b[0].y
        }
        draw(){
            this.context.canvasContext.drawImage(this.image,this.x,this.y);
        }
    }

    return GameItem;
});