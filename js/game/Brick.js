define(["base/GameItem","util","config"],function(GameItem,util,config) {
    'use strict';

    class Brick extends GameItem{
        constructor(context,initConfig) {
            super(context);
            this.setup(initConfig);
        }
        setup({x=0,y=0,health=1}){
            this.x = x;
            this.y = y;
            this.health = health;
            this.loadImage(Brick.getImageNameByHealth(this.health));
        }
        setPosition({x=0,y=0}){
          this.x = x;
          this.y = y;
        }
        static getImageNameByHealth(health){
            return `bricks/brick${health}`
        }
        static setPositionRandom(bricks){
            var totalCount = bricks.length;
            var eachWidth = 50,eachHeight = 30;
            var maxCount = Math.floor((context.width - eachWidth) / eachWidth);
            var minCount = 2;
            var currentCount = 0;
        
            return bricks;
        }
        static loadBricks(context,level){
          var bricks = [];
          var bricksConfig = config.bricks[level - 1];
          if(util.isNumber(bricksConfig)){
            var count = bricksConfig;
            while(count-- >0){
              bricks.push(new Brick())
            }
          }else{
            var totalCount = bricksConfig.totalCount || 0;
            bricksConfig.settings.forEach(({count,health})=>{
              while(count-- > 0){
                bricks.push(new Brick({health}))
              }
            })
          }
          return Brick.setPositionRandom(bricks);
        }
        isAlive(){
            return this.health > 0;
        }
        kill(){
            this.health--;
            this.health > 0 && this.loadImage(Brick.getImageNameByHealth(this.health));
        }
    }

    return Brick;
});
