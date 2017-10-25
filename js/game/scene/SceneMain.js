define(["base/Scene",'entity/Ball','entity/Paddle','entity/Brick','scene/SceneEnd',
'scene/SceneOver','entity/Background','entity/Score','entity/LevelElement','util',],
function(Scene,Ball,Paddle,Brick,SceneEnd,SceneOver,Background,Score,LevelElement,util) {
    'use strict';

    class SceneMain extends Scene{
        constructor(){
            super();
        }
        init({level=1,score=new Score(this)}) {
            this.level = level;
            this.maxLevel = this.getConfig().getGlobal().maxLevel;
            this.registerEvent("gameend", (...args) => {
                this.replaceScene(new SceneEnd(),...args);
            })
            this.addNativeEventListener("click",({target,pageX,pageY})=>{
                if(target != this.getContext().canvas){
                    return;
                }
              var offset = this.getContext().getOffset();
              this.ball.changePosition({
                x:pageX - offset.x,
                y:pageY - offset.y,
              })
            })
            this.isLoading = true;

            this.background = new Background(this,{level:this.level});
            this.addElement(this.background);
            this.levelElment = new LevelElement(this,{level:this.level});
            this.addElement(this.levelElment);
            this.score = score;
            this.addElement(this.score);

            this.ball = new Ball(this);
            this.ball.registerEvent("bottomOut", () => {
               this.triggerEvent("gameover");
            })
            this.ball.speedUp(this.level);
            this.addElement(this.ball);

            this.paddle = new Paddle(this);
            this.addElement(this.paddle);

            this.bricks = this.loadBricks()
            this.addElement(this.bricks);
            this.addNativeEventListener("keyup", (e) => {
                if(e.key !== "p"){
                    return;
                }
                this.paused ?  this.triggerEvent("continue") :  this.triggerEvent("pause") 
                this.paused = !this.paused;
            })
            this.registerAction("ArrowLeft", () => {
                this.paddle.moveLeft();
            })
            this.registerAction("ArrowRight", () => {
                this.paddle.moveRight();
            })
            this.registerAction("ArrowUp", () => {
                this.paddle.moveTop();
            })
            this.registerAction("ArrowDown", () => {
                this.paddle.moveBottom();
            })
            this.registerAction("r", () => {
               this.triggerEvent("gameover")
            })
            this.registerEvent("gameover", () => {
                this.replaceScene(new SceneOver());
            })
        }
        toNextLevel(){
            if(++this.level > this.maxLevel){
                this.triggerEvent("gameend",{score:this.score.value})
                return;
            }
            this.replaceScene(new SceneMain(),{level:this.level,score:this.score},{showLoading:true})
          }
        collideDetect(){
            // 碰撞检测并分离
          if(this.ball.collide(this.paddle)){
              this.ball.separateFrom(this.paddle)
              this.paddle.changeToCollide();
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
        loadBricks() {
            var bricksConfig = this.getConfig().getBricks(this.level - 1);
            var area = this.getConfig().getGlobal()["bricksArea"];
            var getPosition = util.getRandomPosFactory(area);
            var bricks = [];
            if (util.isNumber(bricksConfig)) {
                var count = bricksConfig;
                bricks = this.loadBricksByCount(count,getPosition);
            } else {
                var totalCount = bricksConfig.totalCount || 0;
                bricksConfig.settings.forEach(({ count, health }) => {
                    bricks = bricks.concat(this.loadBricksByCount(count,getPosition,{health}));
                })
                var resetCount = totalCount - bricks.length;
                bricks = bricks.concat(this.loadBricksByCount(resetCount,getPosition));
            }
            this.logger.log("生成砖块",bricks)
            return bricks;
        }
        loadBricksByCount(count,getPos,extraData){
            var bricks = [];
            if(count <= 0){
                return [];
            }
            while(count-- > 0){
                var pos = getPos();
                bricks.push(new Brick(this, Object.assign(pos,extraData)));
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
