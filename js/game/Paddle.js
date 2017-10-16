define(["base/GameItem"],function(GameItem) {
    'use strict';
    
    class Paddle extends GameItem{
        constructor(context){
            super(context);
            this.loadImage('paddle');
            this.setup();
        }
        setup(){
            this.x =   this.context.width / 2 - this.width / 2;
            this.y =  this.context.height - this.height * 3;
            this.step = this.step * 2;
        }
        moveLeft(){
            if(this.x < this.step){
                this.x = 0;
                return;
            }
            this.x -= this.step;
        }
        moveTop(){     
            this.y -= this.step;
        }
        moveBottom(){
            this.y += this.step;
        }
        moveRight(){
            if(this.x + this.step + this.image.width > this.context.width){
                this.x = this.context.width - this.image.width
                return;
            }
            this.x += this.step;
        }
    }

    return Paddle;
});