define(["base/Element"],function(Element) {
    'use strict';

    class Paddle extends Element{
        constructor(context){
            super(context);
            this.loadImage('paddles/3-1');
            this.setup();
        }
        setup(){
            this.width = 120;
            this.height = 40;
            this.x =   this.context.width / 2 - this.width / 2;
            this.y =  this.context.height - this.height;
            this.step = this.step * 2;
        }
        moveLeft(){
            if(this.x < this.step){
                this.x = 0;
                return;
            }
            this.x -= this.step;
        }
        moveRight(){
            if(this.x + this.step + this.width > this.context.width){
                this.x = this.context.width - this.width
                return;
            }
            this.x += this.step;
        }
        moveTop(){
          if(this.y < this.step){
              this.y = 0;
              return;
          }
            this.y -= this.step;
        }
        moveBottom(){
          if(this.y + this.step + this.height > this.context.height){
              this.y = this.context.height - this.height
              return;
          }
            this.y += this.step;
        }
    }

    return Paddle;
});
