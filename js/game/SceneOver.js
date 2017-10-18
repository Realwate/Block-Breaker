define(["base/Scene"],
function(Scene,SceneMain) {
    'use strict';

    class SceneOver extends Scene{
        constructor(context){
            super(context);
            this.setup();
        }
        setup(){
            this.registerAction("r", () => {
                require(["SceneMain"],(SceneMain)=>{
                    var main = new SceneMain(this.context);
                    this.replaceScene(main);
                });

            })
        }
        draw(){
           super.draw();
           this.context.canvasContext.fillText("游戏结束！按R键重新开始",100,100)
        }
    }

    return SceneOver;
});
