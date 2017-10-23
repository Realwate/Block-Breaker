define(["config","util"], function (globalConfig,util) {
    'use strict';

    class Configuration {
        constructor() {
          this.base = globalConfig;
          this.cache = {};
        }
        getElementBuilder(name){
          return this.base["elements"][name.toLowerCase()];
        }
        env(){
            return this.base["env"];
        }
        getImages(){
          if(this.cache["imageNames"] == null){
            var imageConfig = this.base["images"];
            var getImageNames = function(imageNames,obj,prefix){
                if(util.isObject(obj)){
                    obj.names.forEach((name)=>{
                        getImageNames(imageNames,name,prefix + "/" + (name.prefix || ""));
                    });

                }else{
                    var name = obj;
                    var fullName = `${prefix}${name}`
                    imageNames.push(fullName);
                }
            }

            var imageNames = [];
            getImageNames(imageNames,{
                names:imageConfig
            },"");
            this.cache["imageNames"] = imageNames;
          }

          return this.cache["imageNames"];
        }
        getGlobal(){
          return this.base["global"];
        }
        getBricks(index){
           var bricks = this.base.bricks;
           index = index % bricks.length;
           return bricks[index];
        }
    }
    var instance = new Configuration();

    return instance;
});
