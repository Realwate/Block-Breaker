define(["base/Element"],function(Element) {
    'use strict';

    class Paddle extends Element{
        constructor(context,paddleBuilder){
            super(context);
            paddleBuilder = Object.assign({},this.getConfig().getElementBuilder("paddle"),paddleBuilder);
            this.setup(paddleBuilder);
        }
        setup(paddleBuilder){
            super.setup(paddleBuilder);
            this.x =   this.context.width / 2 - this.width / 2;
            this.y =  this.context.height - this.height;
            this.step = this.step * 2;
            this.currentState = Paddle.STATE.NORMAL;
        }
        changeState(){
            // TODO 配置自动化
            this.currentState = Paddle.STATE.COLLISION;
            this.loadImage("paddles/1-1");

            if( this.currentState == Paddle.STATE.COLLISION){
                setTimeout(()=>{
                    this.currentState = Paddle.NORMAL;
                    this.loadImage();
                },200)
              
            }
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
    Paddle.STATE = {
        NORMAL:1,
        COLLISION:2,
    }

    return Paddle;
});
