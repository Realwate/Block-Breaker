
/**
 * Game负责整个游戏的初始化，场景切换。
 */
define(["scene/SceneStart", "scene/SceneMain", "scene/SceneEnd","AppContext","util",'Configuration'],
    function (SceneStart, SceneMain, SceneEnd,AppContext,util,configuration) {
        'use strict';

        class Game {
            constructor(canvas) {
              this.canvas = canvas;
              this.setup(configuration.getGlobal())
            }
            setup({width,height,fps}){
              this.canvas.height = height;
              this.canvas.width = width;
              this.fps = fps;

              this.context = new AppContext(this,this.canvas,configuration);
              this.timer = null;
              this.draw = this.draw.bind(this);
            }
            start() {
                this.replaceScene(new SceneStart());
                this.context.fillText("加载资源中...",50,100);
                //预加载图片
                util.loadImage(this.context.configuration.getImages())
                .then(imageInfos=>{
                    imageInfos.forEach((imageInfo)=>{
                        this.context.addImage(imageInfo.fullName,imageInfo.image)
                    })
                })
                .then(this.draw)
            }
            draw(){
                this.scene.draw();
                // window.requestAnimationFrame(draw);
                this.timer = setTimeout(this.draw,1000/this.fps)
            }
            pause(){ 
                clearTimeout(this.timer);
            }
            replaceScene(scene,sceneBuilder={}) {
                scene.registerEvent("pause",()=>{
                    this.pause();
                })
                scene.registerEvent("continue",()=>{
                    this.draw();
                })
                this.scene && this.scene.destroy();
                this.scene = scene;
                this.scene.setContext(this.context);
                this.scene.init(sceneBuilder); //由Game调用init 统一控制Scene初始化过程
            }
        }
        return Game;

    });
