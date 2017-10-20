define(["base/Element", "util", "config"], function(Element, util, config) {
    'use strict';
    class Score extends Element {
        constructor(context) {
            super(context);
            this.setup();
        }
        setup() {
            this.value = 0;
        }
        increase(value = 10) {
            this.value += value;
        }
        decrease(value = 10) {
            this.value -= value;
        }
        draw() {
            this.context.canvasContext.fillText(`分数:${this.value}`, 5, 20);
        }
    }
    return Score;
});
