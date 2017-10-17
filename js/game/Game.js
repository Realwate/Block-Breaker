
/**
 * Game负责整个游戏的初始化，场景切换。
 */
define(["SceneStart", "SceneMain", "SceneEnd","util",'config'],
    function (SceneStart, SceneMain, SceneEnd,util,config) {
        'use strict';

        class Game {
            constructor(canvas) {
                this.canvas = canvas;
                this.imageCache = {};
                this.context = {
                    game:this,
                    width: canvas.width,
                    height: canvas.height,
                    canvasContext: canvas.getContext("2d"),
                    imageCache:this.imageCache,
                };
                this.context.canvasContext.font="18px yahei";
                this.scene = new SceneStart(this.context);
            }
            start() {
                this.context.canvasContext.fillText("加载资源中...",50,100);
                var draw = ()=>{
                    this.scene.draw();
                    window.requestAnimationFrame(draw);
                    // setTimeout(draw,1000/20)
                }
                //预加载图片
                var images = config.images;
                util.loadImage(images)
                .then(imageInfos=>{
                    imageInfos.forEach((imageInfo)=>{
                        this.imageCache[imageInfo.fullName] = imageInfo.image;
                    })
                })
                .then(draw)
            }
            replaceScene(scene) {
                this.scene.destroy();
                this.scene = scene;
            }
        }
        return Game;

    });
