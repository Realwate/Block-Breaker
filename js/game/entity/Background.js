define(["base/Element","util","Configuration"],function(Element,util,config) {
    'use strict';

    class Background extends Element{
        constructor(context,backgroundBuilder) {
            super(context);
            backgroundBuilder = Object.assign({},config.getElementBuilder("background"),backgroundBuilder);
            this.setup(backgroundBuilder);
        }
        setup(backgroundBuilder){
            this.loadImage(Background.getImageNameByLevel(backgroundBuilder.level));
            super.setup(backgroundBuilder);
        }
        static getImageNameByLevel(level=1){
            return `background/${level}`
        }
    }

    return Background;
});
