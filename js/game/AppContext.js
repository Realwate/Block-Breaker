define(["config"], function (config) {
    'use strict';

    class AppContext {
        constructor(game,canvas) {
            this.game = game;
          this.canvas = canvas;
          this.canvasContext = canvas.getContext("2d");
          this.canvasContext.font="18px yahei";
          this.width = canvas.width;
          this.height = canvas.height;
          this.imageCache = {};
        }
        getImage(name){
            if(!name.startsWith("/")){
                name = "/" + name;
            }
            return this.imageCache[name];
        }
        addImage(name,img){
            this.imageCache[name] = img;
        }
        replaceScene(scene,initConfig){
            this.game.replaceScene(scene,initConfig);
        }
        getOffset(){
            var offsetRect = this.canvas.getBoundingClientRect()
            var offsetX = offsetRect.left + document.body.scrollLeft + canvas.clientLeft;
            var offsetY = offsetRect.top + document.body.scrollTop + canvas.clientTop;
            return {
                x:offsetX,y:offsetY
            }
        }
    
    }

    function addCanvasFunction(){
        "fillText,drawImage,clearRect,save,translate,scale,restore".split(",")
        .forEach(function(funcName){
            AppContext.prototype[funcName] = function(...args){
                this.canvasContext[funcName](...args);
            }
        })
    }
    addCanvasFunction();

    return AppContext;
});
