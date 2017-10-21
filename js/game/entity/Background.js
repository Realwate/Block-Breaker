define(["base/Element","util","config"],function(Element,util,config) {
    'use strict';

    class Background extends Element{
        constructor(context,level) {
            super(context);
            this.loadImage(Background.getImageNameByLevel(level));
        }
        static getImageNameByLevel(level){
            level = 1;
            return `background/${level}`
        }
    }

    return Background;
});
