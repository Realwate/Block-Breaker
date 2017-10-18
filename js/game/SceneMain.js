define(["base/Scene",'Ball','Paddle','Brick','SceneEnd','SceneOver','config'],
function(Scene,Ball,Paddle,Brick,SceneEnd,SceneOver,config) {
    'use strict';

    class SceneMain extends Scene{
        constructor(context){
            super(context);
            this.init();
            this.setup();
        }
        init(){
          this.ball = new Ball(this.context);
          this.ball.registerEvent("bottomOut",()=>{
              var end = new SceneEnd(this.context);
              this.replaceScene(end);
          })
          this.addElement(this.ball);
          this.paddle = new Paddle(this.context);
          this.addElement(this.paddle);

          this.bricks = Brick.loadBricks(this.context,this.level)
          this.addElement(this.bricks);
        }
        setup(){
          this.level = 1;
          this.maxLevel = config.bricks.length;
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
          this.registerEvent("gameend",()=>{
            var end = new SceneEnd(this.context);
            this.replaceScene(end);
          })
          this.registerAction("gameover",()=>{
            var end = new SceneOver(this.context);
            this.replaceScene(end);
          })
        }
        collideDetect(){
            // 碰撞检测并分离
          if(this.ball.collide(this.paddle)){
              this.ball.separateFrom(this.paddle)
          }
          this.bricks.some((brick,i)=>{
              if(brick.collide(this.ball)){
                  brick.kill();
                  if(!brick.isAlive()){
                      this.bricks.splice(i,1);
                  }
                  this.ball.separateFrom(brick)
                  return true;
              }
          });
        }
        toNextLevel(){
          this.level++;
          if(this.level > this.maxLevel){
              this.trigerEvent("gameend")
              return;
          }
         this.init();
        }
        draw(){
          // 检测其他元素是否碰撞到ball
          this.collideDetect();
          this.ball.move();
           // 检测ball是否碰撞到其他元素
          this.collideDetect();
          // 绘制所有元素
          super.draw();
          if(this.bricks.length == 0){
            // TODO 进入下一关
            this.toNextLevel();
          }
        }
    }

    return SceneMain;
});
