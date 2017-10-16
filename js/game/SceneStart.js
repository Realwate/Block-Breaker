define(["base/Scene","SceneMain"],
function(Scene,SceneMain) {
    'use strict';
    
    class SceneStart extends Scene{
        constructor(context){
            super(context);
            this.setup()
        }
        setup(){
            this.registerAction("k", () => {
                var main = new SceneMain(this.context);
                this.replaceScene(main);
            })
        }
        draw(){
            super.draw();

            //开始绘制
           this.context.canvasContext.fillText("K键开始游戏..",100,100)
        }
    }

    return SceneStart;
});