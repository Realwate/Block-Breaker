
/**
 * Game负责整个游戏的初始化，场景切换。
 */
define(["SceneMain"],function(SceneMain) {
    'use strict';
    
    class Game {
     constructor(canvas){
        this.canvas = canvas;
        this.context = {
            width:canvas.width,
            height:canvas.height,
            canvasContext: canvas.getContext("2d")
        };
        this.scene = new SceneMain(this.context);
     }
     start(){ 
        var draw = function (){
            this.scene.draw();
            window.requestAnimationFrame(draw);
            // setTimeout(draw,1000/60)
         }.bind(this);

         //预加载资源处理
        setTimeout(draw,500);
        // draw();
        
     }
     replaceScene(scene){
         this.scene.destroy();
         this.scene = scene;
     }
    }
    return Game;

});