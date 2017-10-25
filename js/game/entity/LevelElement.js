define(["base/Element","util"],function(Element,util) {
    'use strict';

    class LevelElement extends Element{
        constructor(context,levelBuilder) {
            super(context);
            levelBuilder = Object.assign({},this.getConfig().getElementBuilder("level"),levelBuilder);
            this.setup(levelBuilder);
        }
        setup({level,width,height}){
            this.level = level;
            this.width = width;
            this.height = height;
            this.loadImage(this.getImageName());
            this.x =  this.context.width / 2 - this.width / 2;
            this.y =  10;
            this.logger.log("位置",this)
        }
        getImageName(){
            return `levels/${this.level}`
        }
    }

    return LevelElement;
});
