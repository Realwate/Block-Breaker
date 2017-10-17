define(["base/GameItem","util"],function(GameItem,util) {
    'use strict';

    class Brick extends GameItem{
        constructor(context,initConfig) {
            super(context);
           
            this.setup(initConfig);
        }
        setup({x=0,y=0,health=1}){
            this.x = x;
            this.y = y;
            this.health = health;
            this.loadImage(Brick.getImageNameByHealth(this.health));
        }
        static getImageNameByHealth(health){
            return `bricks/brick${health}`
        }
        static init(context,x,y,count){
            var bricks = [];
            var eachWidth = 50;
            var maxCount = Math.floor((context.width - eachWidth) / eachWidth);
            var minCount = 2;
            var currentCount = 0;

            for (var i = 40; count > 0; i += 30) {
                if(count == minCount){
                    currentCount == minCount;
                    count = 0;
                }else{
                    currentCount = Math.min(util.getRandom(1, Math.round(maxCount/2)),count);
                    count -= currentCount;
                }
              
               var averageWidth = Math.floor((context.width - eachWidth) / currentCount);
                for (var j = 0; j < currentCount; j++) {
                    var brick = new Brick(context,{x:j * averageWidth + eachWidth,y:i});
                    bricks.push(brick);
                }
            }
            return bricks;
        }
        isAlive(){
            return  this.health > 0;
        }
        kill(){
            this.health--;
            this.health > 0 && this.loadImage(Brick.getImageNameByHealth(this.health));
        }
    }

    return Brick;
});
