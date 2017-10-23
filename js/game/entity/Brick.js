define(["base/Element","util"],function(Element,util) {
    'use strict';

    class Brick extends Element{
        constructor(context,brickBuilder={}) {
            super(context);
            brickBuilder = Object.assign({},this.getConfig().getElementBuilder("brick"),brickBuilder);
            this.setup(brickBuilder);
        }
        setup(brickBuilder){
            super.setup(brickBuilder);
            this.health = brickBuilder.health || 1;
            this.loadImage(Brick.getImageNameByHealth(this.health));
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
