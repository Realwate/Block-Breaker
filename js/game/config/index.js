define(function() {
    'use strict';
    var env = "dev";
    var global = {
        width: 480,
        height: 330,
        fps:50,
        maxLevel:4,
        bricksArea:{ width: 300, height:170, startX: 50, startY: 50 }
    }
    var elements = {
      base:{
        step:2.8,
      },
      level:{
        width:80,
        height:120,
        level:1
      },
      background:{
        width:global.width,
        height:global.height,
        level:1
      },
      ball:{
        defaultImage:[   {name:"balls/bird1/2",frame:5},{name:"balls/bird1/1",frame:90},
        {name:"balls/bird1/2",frame:5},
        {name:"balls/bird1/3",frame:2},
        {name:"balls/bird1/5",frame:6},
        {name:"balls/bird1/3",frame:2}],
        width:27,
        height:27
      },
      brick:{
        width:52,
        height:20
      },
      paddle:{
        defaultImage:[{name:"paddles/3-1",frame:40}],
        width:130,
        height:25
      }
    }
    var images = [{
        prefix: "balls",
        names: [{
            prefix:"bird1",
            names:["1","2", "3", "4","5"]
        },{
            prefix:"bird2",
            names:["1","2", "3", "4","5"]
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
    },{
        prefix: "levels",
        names: ["1", "2", "3", "4", "5"]
    }];

    var bricks = [
      4, {
          totalCount: 6,
          settings: [{
              health: 2,
              count: 3
          }]
      }, {
          totalCount: 9,
          settings: [{
              health: 2,
              count: 4
          }, {
              health: 3,
              count: 2
          }]
      }, {
        totalCount: 12,
        settings: [{
            health: 2,
            count: 6
        }, {
            health: 3,
            count: 3
        }]
    }
  ];
    return {
        env,
        global,
        elements,
        images,
        bricks
    }
});
