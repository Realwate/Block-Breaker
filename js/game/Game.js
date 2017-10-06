
/**
 * Game负责整个游戏的初始化，场景切换。
 */
define(["SceneStart", "SceneMain", "SceneEnd","util"],
    function (SceneStart, SceneMain, SceneEnd,util) {
        'use strict';

        class Game {
            constructor(canvas) {
                this.canvas = canvas;
                this.imageCache = {};
                this.context = {
                    width: canvas.width,
                    height: canvas.height,
                    canvasContext: canvas.getContext("2d"),
                    imageCache:this.imageCache,
                };
                this.context.canvasContext.font="18px yahei";
                this.scene = new SceneStart(this.context);
                this.scene.registerAction("k", () => {
                    createMain();
                })
                var createMain = () => {
                    var main = new SceneMain(this.context);
                    main.registerEvent("gameover", () => {
                        var end = new SceneEnd(this.context);
                        end.registerAction("r", () => {
                            createMain();
                        })
                        this.replaceScene(end);
                    })
                    this.replaceScene(main);
                }
            }
            start() {
                this.context.canvasContext.fillText("加载资源中...",50,100);
                var draw = ()=>{
                    this.scene.draw();
                    window.requestAnimationFrame(draw);
                    // setTimeout(draw,1000/60)
                }
                //预加载鱼片
                var imageNames = ["ball","paddle"]
                Promise.all(imageNames.map(name=>{
                    return util.loadImage(name)
                    .then(image=>{
                        this.imageCache[name] = image;
                    })
                }))
                .then(draw)

            }
            replaceScene(scene) {
                this.scene.destroy();
                this.scene = scene;
            }
        }
        return Game;

    });