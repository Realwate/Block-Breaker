define(["base/Scene"],
function(Scene,SceneMain) {
    'use strict';

    class SceneEnd extends Scene{
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
           this.context.canvasContext.fillText("游戏结束！您的得分为100",100,100)
        }
    }

    return SceneEnd;
});
