define(["base/GameItem","util"],function(GameItem,util) {
    'use strict';

    class Brick extends GameItem{
        constructor(context,x,y) {
            super(context);
            if(x!=null){
                this.x = x;
                this.y = y;
            }
            this.setup();
        }
        setup(){
            this.health = 2//util.getRandom(1,3);
            this.loadImage(Brick.getImageNameByHealth(this.health));   
        }
        static getImageNameByHealth(health){
            return `bricks/brick${health}`
        }
        static init(context,x,y,count){
            var bricks = [];
            // while(count > 0){
            //     var currentCount = util.getRandom(1,count + 1);
            //     count -= currentCount;
            //     while(currentCount-- > 0){
            //         var brick = new Brick();
            //         bricks.push(brick);
            //     }
            // }
            for(var i=0;i<120;i+=30){
                bricks.push(new Brick(context,i*3,i));
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