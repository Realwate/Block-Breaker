define(["Logger"], function (Logger) {
    var logger = Logger.getInstance();
    var util = {};
    var __toString = function (o) {
        return Object.prototype.toString.call(o);
    }
    "Function,Array,Object,Number".split(",")
        .forEach(function (type) {
            util["is" + type] = function (o) {
                return __toString(o) == `[object ${type}]`
            }
        })
    util.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    var tag = `game${Date.now()}`;
    util.getTag = function () {
        return tag;
    }
    util.uuidFactory = function () {
        var guid = 1;
        return function (min, max) {
            return guid++;
        }
    }
    util.getUUID = util.uuidFactory();
    util.normalizeNum = function(num, min, max) {
        if (num < min) {
            return min;
        }
        return num > max ? max :num;
    }

    util.getImageFullPath = function (path) {
        path.includes(".") || (path += ".png");
        path.startsWith("/") || (path = path.slice(1))
        return `./assets/img/${path}`;
    }
    util.loadOneImage = function (fullName) {
        var fullePath = util.getImageFullPath(fullName);
        var image = new Image();
        image.src = fullePath;
        return new Promise((resolve, reject) => {
            image.onload = () => {
                resolve({ fullName, image });
            }
        })
    }

    util.loadImage = function (imageNames) {
        logger.log("加载图片：", imageNames);
        return Promise.all(imageNames.map((fullName) => {
            return util.loadOneImage(fullName);
        }));
    }

    util.getRandomPosFactory = function ({ width: containerWidth, height: containerHeight, startX, startY }) {
        var eachWidth = 50,
            eachHeight = 30;
        var rowCount = Math.floor(containerWidth / eachWidth)
        var colCount = Math.floor(containerHeight / eachHeight)
        var totalCount = rowCount * colCount;
        var flagMap = {};
        for (var i = 0; i < totalCount; i++) {
            flagMap[i] = true;
        }

        return function () {
            var x = startX, y = startY;
            var restSeats = Object.keys(flagMap)
                .filter(index => flagMap[index]);
            if (restSeats.length == 0) {
                return { x, y }
            }
            //从剩余的位置中随机一个
            var randomIndex = util.getRandom(0, restSeats.length);
            var num = restSeats[randomIndex]
            flagMap[num] = false;

            var row = Math.floor(num / rowCount)
            var col = num % colCount;
            y += row * eachHeight;
            x += col * eachWidth;
            return {
                x, y
            }
        }
    }

    return util;
});
