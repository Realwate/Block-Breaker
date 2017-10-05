define(function() {
    'use strict';

    class GameItem {
        constructor(context){
            this.context = context;
            this.step = 3;
            this.x = 0;
            this.y = 0;
            this.image = new Image();
        }
         loadImage(path){
           this.image.src = path;
           return new Promise((resolve,reject)=>{
            this.image.onload = ()=>{
                resolve(this.image);
            }
           })
        }
        static getPoint(item){
            return [
                {x:item.x,y:item.y},
                {x:item.x + x.image.width,y:item.y},
                {x:item.x,y:item.y + item.image.width},
                {x:item.x + x.image.width,y:item.y + item.image.width},
            ]
        }
        static collide(a,b){
            GameItem.getPoint(a)
            .some(aPoint=>{
                var bPoint = GameItem.getPoint(b)

                return aPoint.x >= bPoint[0].x && aPoint.x <= bPoint[3].x
                && aPoint.y >= bPoint[0].y && aPoint.y <= bPoint[3].y
            })
           
        }
        collide(item){
           return GameItem.collide(this,item) || GameItem.collide(item,this) 
        }
        draw(){
            this.context.canvasContext.drawImage(this.image,this.x,this.y);
        }
    }

    return GameItem;
});