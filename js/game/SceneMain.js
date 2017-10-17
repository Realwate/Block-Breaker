define(["base/Scene",'Ball','Paddle','Brick','SceneEnd'],
function(Scene,Ball,Paddle,Brick,SceneEnd) {
    'use strict';

    class SceneMain extends Scene{
        constructor(context){
            super(context);
            this.setup();
        }
        setup(){
            this.ball = new Ball(this.context);
            this.addElement(this.ball);
            this.paddle = new Paddle(this.context);
            this.addElement(this.paddle);

            this.bricks = Brick.init(this.context,0,0,10)
            this.addElement(this.bricks);
            //
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
            this.registerAction("r",()=>{
              this.triggerEvent("gameover");
            })
            this.registerEvent("gameover", () => {
                var end = new SceneEnd(this.context);
                this.replaceScene(end);
            })
        }
        collideDetect(){
          //根据具体元素 判断 更新元素状态
          if(this.ball.collide(this.paddle)){
              this.ball.reverse(this.paddle)
          }

          this.bricks.some((brick,i)=>{
              if(brick.collide(this.ball)){
                  brick.kill();
                  if(!brick.isAlive()){
                      this.bricks.splice(i,1);
                  }
                  this.ball.reverse(brick)
                  return true;
              }
          });
        }
        draw(){
          // 碰撞检测
          this.collideDetect();
          this.ball.move();
          this.collideDetect();
          //绘制所有元素
          super.draw();
          if(this.bricks.length == 0){

          }
        }
    }

    return SceneMain;
});
