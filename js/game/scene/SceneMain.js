define(["base/Scene",'entity/Ball','entity/Paddle','entity/Brick','scene/SceneEnd',
'scene/SceneOver','entity/Background','entity/Score','util','Configuration'],
function(Scene,Ball,Paddle,Brick,SceneEnd,SceneOver,Background,Score,util,config) {
    'use strict';

    class SceneMain extends Scene{
        constructor(){
            super();
        }
        init({level=1,score=new Score(this)}) {
            this.level = level;
            this.maxLevel = config.getGlobal().maxLevel;
            this.registerEvent("gameend", () => {
                var end = new SceneEnd();
                this.replaceScene(end,{score:this.score.value});
            })
            this.addNativeEventListener("click",({pageX,pageY})=>{
              var offset = this.getContext().getOffset();
              this.ball.changePosition({
                x:pageX - offset.x,
                y:pageY - offset.y,
              })
            })

            this.background = new Background(this);
            this.addElement(this.background);
            this.score = score;
            this.addElement(this.score);

            this.ball = new Ball(this);
            this.ball.registerEvent("bottomOut", () => {
               this.triggerEvent("gameover");
            })
            this.addElement(this.ball);
            this.paddle = new Paddle(this);
            this.addElement(this.paddle);

            this.bricks = this.loadBricks(this.level)

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
                var end = new SceneOver();
                this.replaceScene(end);
            })
        }
        toNextLevel(){
            if(++this.level > this.maxLevel){
                this.triggerEvent("gameend",this.score.value)
                return;
            }
            var main = new SceneMain();
            this.replaceScene(main,{level:this.level,score:this.score})
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
        loadBricks(level) {
            var bricks = [];
            var bricksConfig = config.getBricks(level - 1);
            var area = config.getGlobal()["bricksArea"];
            var getPosition = util.getRandomPosition(area);
            if (util.isNumber(bricksConfig)) {
                var count = bricksConfig;
                while (count-- > 0) {
                    var position = getPosition();
                    this.logger.log("生成位置:",position);
                    bricks.push(new Brick(this, position))

                }
            } else {
                var totalCount = bricksConfig.totalCount || 0;
                bricksConfig.settings.forEach(({ count, health }) => {
                    while (count-- > 0) {
                        var position = getPosition();
                        bricks.push(new Brick(this, Object.assign({ health }, position)))
                    }
                })
                var resetCount = totalCount - bricks.length;
                if(resetCount > 0){
                    while(resetCount-- > 0){
                        var position = getPosition();
                        bricks.push(new Brick(this, position));
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
