define(function() {
    'use strict';
    var env = "dev";
    var global = {
        width: 460,
        height: 320,
    };

    var images = [{
        prefix: "balls",
        names: [{
            prefix:"bird1",
            names:["1","2", "3", "4"]
        }]
    }, {
        prefix: "paddles",
        names: ["1-1", "1-2", "3-1", "3-2"]
    }, {
        prefix: "bricks",
        names: ["1", "2", "3", "4"]
    }, {
        prefix: "background",
        names: ["1", "2", "3", "4"]
    }];

    var bricks = [
      5, {
          totalCount: 8,
          settings: [{
              health: 2,
              count: 3
          }]
      }, {
          totalCount: 12,
          settings: [{
              health: 2,
              count: 4
          }, {
              health: 3,
              count: 2
          }]
      }
  ];
    return {
        env,
        global,
        images,
        bricks
    }
});
