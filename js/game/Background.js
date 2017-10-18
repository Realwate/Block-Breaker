define(["base/GameItem","util","config"],function(GameItem,util,config) {
    'use strict';

    class Background extends GameItem{
        constructor(context,level) {
            super(context);
            this.loadImage(this.getImageNameByLevel(level));
        }
        getImageNameByLevel(level){
            level = 1;
            return `background/background${level}`
        }
    }

    return Background;
});
