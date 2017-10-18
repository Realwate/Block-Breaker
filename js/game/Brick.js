define(["base/GameItem","util","config"],function(GameItem,util,config) {
    'use strict';

    class Brick extends GameItem{
        constructor(context,initConfig={}) {
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
