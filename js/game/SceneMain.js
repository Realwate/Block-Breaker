define(["base/Scene",'Ball','Paddle','Brick'],
function(Scene,Ball,Paddle,Brick) {
    'use strict';
    
    class SceneMain extends Scene{
        constructor(context){
            super(context);
            this.ball = new Ball(context);
            this.paddle = new Paddle(context);

            this.registerAction("a",()=>{
                this.paddle.moveLeft();
            })
            this.registerAction("d",()=>{
                this.paddle.moveRight();
            })
            this.registerAction("w",()=>{
                this.paddle.moveTop();
            })
            this.registerAction("s",()=>{
                this.paddle.moveBottom();
            })
          
        }
        draw(){
            super.draw();
            if(this.ball.collide(this.paddle)){
                // this.ball.reverse()
                this.triggerEvent("gameover");
            }
            this.ball.move();

            //开始绘制
           this.ball.draw();
           this.paddle.draw();
        }
       
    }

    return SceneMain;
});