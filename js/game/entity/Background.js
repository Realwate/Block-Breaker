define(["base/Element","util"],function(Element,util) {
    'use strict';

    class Background extends Element{
        constructor(context,backgroundBuilder) {
            super(context);
            backgroundBuilder = Object.assign({},this.getConfig().getElementBuilder("background"),backgroundBuilder);
            this.setup(backgroundBuilder);
        }
        setup(backgroundBuilder){
            this.level = backgroundBuilder.level;
            this.loadImage(this.getImageName());
            super.setup(backgroundBuilder);
        }
        draw(){
            super.draw();
        }
        getImageName(){
            return `background/${this.level}`
        }
    }

    return Background;
});
