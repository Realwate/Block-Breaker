define(["base/Element","util","config"],function(Element,util,config) {
    'use strict';

    class Brick extends Element{
        constructor(context,initConfig={}) {
            super(context);
            this.setup(initConfig);
        }
        setup({x=0,y=0,health=1}){
            this.x = x;
            this.y = y;
            this.health = health;
            this.loadImage(Brick.getImageNameByHealth(this.health));
            this.width = 50;
            this.height = 18;
        }
        setPosition({x=0,y=0}){
          this.x = x;
          this.y = y;
        }
        static getImageNameByHealth(health){
            return `bricks/${health}`
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
