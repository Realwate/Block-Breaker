define(["base/Element","Configuration"], function(Element,config) {
    'use strict';
    class Ball extends Element {
        constructor(context,ballBuilder) {
            super(context);
            ballBuilder = Object.assign({},config.getElementBuilder("Ball"),ballBuilder);
            this.setup(ballBuilder);
        }
        setup(ballBuilder) {
            super.setup(ballBuilder);
            this.speedX = this.step;
            this.speedY = this.step;
        }
        move() {
            if (this.y + this.height >= this.context.height) {
                this.triggerEvent("bottomOut");
            }
            if (this.x + this.width > this.context.width || this.x < 0) {
                this.reverseX()
            }
            if (this.y + this.height > this.context.height || this.y < 0) {
                this.reverseY()
            }
            this.x += this.speedX
            this.y += this.speedY
        }
        separateFrom(element) {
            var intersectRect = this.getIntersect(element);
            if (intersectRect == null) {
                return;
            }
            //找出最小位移 使两者分离
            var direction = intersectRect.width - intersectRect.height;
            var minDistance = Math.min(intersectRect.width, intersectRect.height);
            if (direction > 0) { //垂直移动
                this.reverseY();
                this.y += this.getSpeedYDir() * minDistance;
            } else if (direction < 0) { //水平移动
                this.reverseX();
                this.x += this.getSpeedXDir() * minDistance;
            } else { //同时移动
                this.reverseX();
                this.reverseY();
                this.x += this.getSpeedXDir() * minDistance;
                this.y += this.getSpeedYDir() * minDistance;
            }
            // x,y不能超出边界
            this.normalizeXY();
        }
        getSpeedXDir(x) {
            return this.speedX / Math.abs(this.speedX);
        }
        getSpeedYDir(x) {
            return this.speedY / Math.abs(this.speedY);
        }
        normalizeXY() {
            this.x = this.normalizeNum(this.x, 0, this.context.width - this.width);
            this.y = this.normalizeNum(this.y, 0, this.context.height - this.height);
        }
        normalizeNum(x, min, max) {
            if (x < min) {
                return min;
            }
            if (x > max) {
                return max;
            }
            return x;
        }
        draw() {
            //反转图像
            if (this.speedX < 0) {
                super.flipHorizontalDraw();
            } else {
                super.draw();
            }
        }
        reverseX() {
            this.speedX *= -1;
        }
        reverseY() {
            this.speedY *= -1;
        }
    }
    return Ball;
});
