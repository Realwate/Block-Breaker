define(["base/Element", "util"], function(Element, util) {
    'use strict';
    class Score extends Element {
        constructor(contextWrapper) {
            super(contextWrapper);
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
            this.context.fillText(`分数:${this.value}`, 5, 20);
        }
    }
    return Score;
});
