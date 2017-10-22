define(["base/Scene"], function(Scene) {
    'use strict';
    class SceneOver extends Scene {
        constructor() {
            super();
        }
        init() {
            this.registerAction("r", () => {
                require(["scene/SceneMain"], (SceneMain) => {
                    var main = new SceneMain();
                    this.replaceScene(main);
                });
            })
        }
        draw() {
            super.draw();
            this.getContext().fillText("游戏结束！按R键重新开始", 100, 100)
        }
    }
    return SceneOver;
});
