define(["base/Scene",'entity/Score',],
function(Scene,Score) {
    'use strict';

    class SceneEnd extends Scene{
        constructor(){
            super();
        }
        init({score=0}){
            this.scoreValue = score;
            this.registerAction("r", () => {
                require(["scene/SceneMain"],(SceneMain)=>{
                    var main = new SceneMain();
                    this.replaceScene(main);
                });

            })
        }
        draw(){
           super.draw();
           this.getContext().canvasContext.fillText(`游戏结束！您的得分为${this.scoreValue}`,100,100)
        }
    }

    return SceneEnd;
});
