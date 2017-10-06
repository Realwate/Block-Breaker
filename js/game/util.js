define(function () {
    var util = {};

    util.name2path = function(name){
         return `./img/${name}.PNG`;
    }
    util.loadImage = function(name){
        var path = util.name2path(name);
        var image = new Image();
        image.src = path;
        return new Promise((resolve,reject)=>{
         image.onload = ()=>{
             resolve(image);
         }
        })
     }

    return util;
});