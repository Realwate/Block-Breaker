define(function () {
    var util = {};
    var guid = 1;
    var __toString = function(o){
        return Object.prototype.toString.call(o);
    }
    "Function,Array,Object,Number".split(",")
    .forEach(function(type){
        util["is" + type] = function(o){
            return __toString(o) == `[object ${type}]`
        }
    })

    util.getImageFullPath = function(path){
        path = /\./.test(path) ? path : path + ".jpg";
         return `./assets/img/${path}`;
    }
    util.loadOneImage = function(fullName){
        var fullePath = util.getImageFullPath(fullName);
        var image = new Image();
        image.src = fullePath;
        return new Promise((resolve,reject)=>{
         image.onload = ()=>{
             resolve({fullName,image});
         }
        })
    }
    util.loadImage = function(imageConfig){
        var imageNames = [];
        imageConfig.map((obj)=>{
            if(util.isObject(obj)){
                obj.names.map((name)=>{
                    var fullName = `${obj.prefix}/${name}`
                    imageNames.push(fullName);
                });

            }else{
                imageNames.push(obj);
            }
        })

        return Promise.all(imageNames.map((fullName)=>{
            return util.loadOneImage(fullName);
        }));
     }
     util.getRandom = function(min, max){
        return Math.floor(Math.random() * (max - min) + min);
     }
     util.getUUID = function(min, max){
        return guid++;
     }
     util.getRandomPosition = function({width:containerWidth,height:containerHeight,startX,startY}){
        var eachWidth = 50,
        eachHeight = 30;
        var rowCount = Math.floor(containerWidth / eachWidth)
        var colCount = Math.floor(containerHeight / eachHeight)
        var totalCount = rowCount * colCount;
        var flagMap = {};
        for (var i = 0; i < totalCount; i++) {
            flagMap[i] = true;
        }

        return function(){
            var x = startX,y = startY;
           var restSeats = Object.keys(flagMap)
            .filter(index=>flagMap[index]);
            if(restSeats.length == 0){
                return {x,y}
            }
            //从剩余的位置中随机一个
            var randomIndex = util.getRandom(0,restSeats.length);
            var num = restSeats[randomIndex]
            flagMap[num] = false;

            var row = Math.floor(num / rowCount)
            var col = num % colCount;
            y += row * eachHeight;
            x += col * eachWidth;
            return {
                x,y
            }
        }
    }
    util.getLogger = function(){
        return {
            log: console.log.bind(console)
        }
    }

    return util;
});
