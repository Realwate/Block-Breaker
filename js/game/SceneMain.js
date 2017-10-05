define(["base/Scene",'Ball','Paddle','Brick'],
function(Scene,Ball,Paddle,Brick) {
    'use strict';
    
    class SceneMain extends Scene{
        constructor(context){
            super(context);
            this.ball = new Ball(context);
            this.paddle = new Paddle(context);

            this.registerAction("a",function(){
                this.paddle.moveLeft();
            }.bind(this))
            this.registerAction("d",function(){
                this.paddle.moveRight();
            }.bind(this))
        }
        draw(){
            super.draw();
            //开始绘制
           this.context.canvasContext.clearRect(0,0,this.context.width,this.context.height)
           this.ball.move();
           this.ball.draw();

           this.paddle.draw();
        }
       
    }

    return SceneMain;
});