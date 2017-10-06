define(["base/Scene"],function(Scene) {
    'use strict';
    
    class SceneEnd extends Scene{
        constructor(context){
            super(context);
        }
        draw(){
            super.draw();

            //开始绘制
           this.context.canvasContext.fillText("游戏结束！按R键重新开始",100,100)
        }
    }

    return SceneEnd;
});