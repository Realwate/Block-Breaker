define(["base/Scene","scene/SceneMain"],
function(Scene,SceneMain) {
    'use strict';

    class SceneStart extends Scene{
        constructor(){
            super();
        }
        init(){
            this.registerAction("k", () => {
                var main = new SceneMain();
                this.replaceScene(main);
            })
        }
        draw(){
            super.draw();
            //开始绘制
           this.getContext().fillText("K键开始游戏..",100,100)
        }
    }

    return SceneStart;
});
