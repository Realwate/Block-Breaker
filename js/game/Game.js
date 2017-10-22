
/**
 * Game负责整个游戏的初始化，场景切换。
 */
define(["scene/SceneStart", "scene/SceneMain", "scene/SceneEnd","AppContext","util",'config'],
    function (SceneStart, SceneMain, SceneEnd,AppContext,util,config) {
        'use strict';

        class Game {
            constructor(canvas) {
                canvas.height = config.global.height;
                canvas.width = config.global.width;
                this.canvas = canvas;
                this.context = new AppContext(this,canvas);
            }
            start() {
                this.replaceScene(new SceneStart());
                this.context.fillText("加载资源中...",50,100);
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
                        this.context.addImage(imageInfo.fullName,imageInfo.image)
                    })
                })
                .then(draw)
            }
            replaceScene(scene,initConfig={}) {
                this.scene && this.scene.destroy();
                this.scene = scene;
                this.scene.setContext(this.context);
                this.scene.init(initConfig); //由Game调用init 统一控制Scene初始化过程
            }
        }
        return Game;

    });
