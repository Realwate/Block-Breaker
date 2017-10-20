define(function() {
    'use strict';
    var env = "dev";
    var global = {
        width: 460,
        height: 320,
    };

    var images = ["ball", "paddle", {
        prefix: "bricks",
        names: ["brick1", "brick2", "brick3", "brick4"]
    }, {
        prefix: "background",
        names: ["background1", ]
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
