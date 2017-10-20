define(["base/Scene",'entity/Score',],
function(Scene,Score) {
    'use strict';

    class SceneEnd extends Scene{
        constructor(context,score){
            super(context);
            this.scoreValue = score;
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
           this.context.canvasContext.fillText(`游戏结束！您的得分为${this.scoreValue}`,100,100)
        }
    }

    return SceneEnd;
});
