
/**
 * Game负责整个游戏的初始化，场景切换。
 */
define(["scene/SceneStart", "scene/SceneMain", "scene/SceneEnd","AppContext","util",'Configuration'],
    function (SceneStart, SceneMain, SceneEnd,AppContext,util,config) {
        'use strict';

        class Game {
            constructor(canvas) {
              this.canvas = canvas;
              this.init(config.getGlobal())
            }
            init({width,height}){
              this.canvas.height = height;
              this.canvas.width = width;
              this.context = new AppContext(this,this.canvas);
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
                util.loadImage(config.getImages())
                .then(imageInfos=>{
                    imageInfos.forEach((imageInfo)=>{
                        this.context.addImage(imageInfo.fullName,imageInfo.image)
                    })
                })
                .then(draw)
            }
            replaceScene(scene,sceneBuilder={}) {
                this.scene && this.scene.destroy();
                this.scene = scene;
                this.scene.setContext(this.context);
                this.scene.init(sceneBuilder); //由Game调用init 统一控制Scene初始化过程
            }
        }
        return Game;

    });
