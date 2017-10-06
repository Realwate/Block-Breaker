define(["base/Scene"],function(Scene) {
    'use strict';
    
    class SceneStart extends Scene{
        constructor(context){
            super(context);
           
        }
        draw(){
            super.draw();

            //开始绘制
           this.context.canvasContext.fillText("K键开始游戏..",100,100)
        }
    }

    return SceneStart;
});