define(function () {
    var util = {};

    var __toString = function(o){
        return Object.prototype.toString.call(o);
    }
    "Function,Array,Object".split(",")
    .forEach(function(type){
        util["is" + type] = function(o){
            return __toString(o) == `[object ${type}]`
        }
    })

    util.getImageFullPath = function(path){
        path = /\./.test(path) ? path : path + ".jpg";
         return `./img/${path}`;
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

    return util;
});