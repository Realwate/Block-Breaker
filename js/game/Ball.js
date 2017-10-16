define(["base/GameItem"],function(GameItem) {
    'use strict';

    class Ball extends GameItem{
        constructor(context){
            super(context);
            this.loadImage('ball');
            this.setup();
        }
        setup(){
            this.speedX = this.step;
            this.speedY = this.step;
        }
        move(){
            if(this.x + this.width > this.context.width 
                || this.x < 0 ){ 
                this.reverseX()
            }
            if(this.y + this.height > this.context.height
                || this.y < 0 ){ 
                this.reverseY();
            }
            this.x +=  this.speedX
            this.y +=  this.speedY
        }
        draw(){
            this.move();
            super.draw();
        }
        //碰撞后变化方向
        reverse(gameItem){
            this.x -=  this.speedX;
            if(this.collide(gameItem)){
                this.reverseY();
                this.x +=  this.speedX;
            }
            else{
                this.reverseX();
            }
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