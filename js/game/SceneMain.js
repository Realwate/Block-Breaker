define(["base/Scene",'Ball','Paddle','Brick','SceneEnd','SceneOver','Background','Score','util','config'],
function(Scene,Ball,Paddle,Brick,SceneEnd,SceneOver,Background,Score,util,config) {
    'use strict';

    class SceneMain extends Scene{
        constructor(context,initConfig={}){
            super(context);
            this.setup(initConfig);
        }
        setup({level=1,score=new Score(this.context)}) {
            this.level = level;
            this.maxLevel = config.bricks.length;
            this.registerEvent("gameend", (args) => {
                var end = new SceneEnd(this.context,args);
                this.replaceScene(end);
            })
            this.addNativeEventListener("click",({pageX,pageY})=>{
              var canvas = this.context.canvas;
              var offsetRect = canvas.getBoundingClientRect()
              var offsetX = offsetRect.left + document.body.scrollLeft + canvas.clientLeft;
              var offsetY = offsetRect.top + document.body.scrollTop + canvas.clientTop;
              this.ball.changePosition({
                x:pageX - offsetX,
                y:pageY - offsetY,
              })
            })

            this.background = new Background(this.context);
            this.background.width = config.global.width;
            this.background.height = config.global.height;
            this.addElement(this.background);
            this.score = score;
            this.addElement(this.score);

            this.ball = new Ball(this.context);
            this.ball.registerEvent("bottomOut", () => {
               this.triggerEvent("gameover");
            })
            this.addElement(this.ball);
            this.paddle = new Paddle(this.context);
            this.addElement(this.paddle);

            this.bricks = this.loadBricks(this.context, this.level)

            this.addElement(this.bricks);
            this.registerAction("a", () => {
                this.paddle.moveLeft();
            })
            this.registerAction("d", () => {
                this.paddle.moveRight();
            })
            this.registerAction("w", () => {
                this.paddle.moveTop();
            })
            this.registerAction("s", () => {
                this.paddle.moveBottom();
            })
            this.registerAction("r", () => {
               this.triggerEvent("gameover")
            })
            this.registerEvent("gameover", () => {
                var end = new SceneOver(this.context);
                this.replaceScene(end);
            })
        }
        toNextLevel(){
            if(++this.level > this.maxLevel){
                this.triggerEvent("gameend",this.score.value)
                return;
            }
            var main = new SceneMain(this.context,{level:this.level,score:this.score});
            this.replaceScene(main)
          }
        collideDetect(){
            // 碰撞检测并分离
          if(this.ball.collide(this.paddle)){
              this.ball.separateFrom(this.paddle)
          }
          this.bricks.some((brick,i)=>{
              if(brick.collide(this.ball)){
                  this.score.increase();
                  brick.kill();
                  if(!brick.isAlive()){
                      this.bricks.splice(i,1);
                  }
                  this.ball.separateFrom(brick)
                  return true;
              }
          });
        }
        loadBricks(context, level) {
            var bricks = [];
            var bricksConfig = config.bricks[level - 1];
            var getPosition = util.getRandomPosition({ width: 300, height:180, startX: 50, startY: 50 });
            if (util.isNumber(bricksConfig)) {
                var count = bricksConfig;
                while (count-- > 0) {
                    var position = getPosition();
                    this.logger.log("生成位置:",position);
                    bricks.push(new Brick(context, position))

                }
            } else {
                var totalCount = bricksConfig.totalCount || 0;
                bricksConfig.settings.forEach(({ count, health }) => {
                    while (count-- > 0) {
                        var position = getPosition();
                        bricks.push(new Brick(context, Object.assign({ health }, position)))
                    }
                })
                var resetCount = totalCount - bricks.length;
                if(resetCount > 0){
                    while(resetCount-- > 0){
                        var position = getPosition();
                        bricks.push(new Brick(context, position));
                    }
                }
            }
            return bricks;
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
            this.toNextLevel();
          }
        }
    }

    return SceneMain;
});
