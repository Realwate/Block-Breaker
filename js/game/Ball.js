define(["base/GameItem"],function(GameItem) {
    'use strict';

    class Ball extends GameItem{
        constructor(context){
            super(context);
            this.loadImage('ball')
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
                this.reverseY();
            }
            this.x +=  this.speedX
            this.y +=  this.speedY
        }
        //碰撞后变化方向
        reverse(paddle){
            this.reverseX();
            this.reverseY();
        }
        reverseX(){
            this.speedX *=-1;
        }
        reverseY(){
            this.speedY *=-1;
        }
    }

    return Ball;
});