define(["base/GameItem","util","config"],function(GameItem,util,config) {
    'use strict';

    class Score extends GameItem{
        constructor(context) {
            super(context);
            this.setup();
        }
        setup(){
          this.value = 0;
        }
        increase(value = 10){
          this.value += value;
        }
        decrease(value = 10){
          this.value -= value;
        }
        draw(){
            this.context.canvasContext.fillText(`分数:${this.value}`,150,18);
        }
    }

    return Score;
});
