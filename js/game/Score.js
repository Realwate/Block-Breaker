define(["base/GameItem","util","config"],function(GameItem,util,config) {
    'use strict';

    class Score extends GameItem{
        constructor(context) {
            super(context);
            this.setup();
        }
        setup(){
        }
        draw(){
            this.context.canvasContext.fillText("分数:100",150,18);
        }
    }

    return Score;
});
