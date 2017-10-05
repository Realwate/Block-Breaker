define(["base/GameItem"],function(GameItem) {
    'use strict';

    class Ball extends GameItem{
        constructor(context){
            super(context);
            this.loadImage('./img/ball.PNG')
            this.speedX = this.step;
            this.speedY = this.step;
        }
        move(){
            if(this.x + this.speedX > this.context.width 
                || this.x < 0 ){ 
                this.reverseX()
            }
            if(this.y + this.speedY > this.context.height
                || this.y < 0 ){ 
                this.reverseX();
            }
            this.x +=  this.speedX
            this.y +=  this.speedY
        }
        reverseX(){
            this.speedX *=-1;
        }
        reverseX(){
            this.speedY *=-1;
        }
    }

    return Ball;
});