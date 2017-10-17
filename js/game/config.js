define(function() {
    'use strict';

    return {
      images:[
        "ball",
        "paddle",
        {
          prefix:"bricks",
          names:[
            "brick1","brick2"
          ]
        }
    ],
    bricks:[
      5,{
        totalCount:8,
        settings:[
          {
            health:2,
            count:3
          }
        ]
      },{
        totalCount:12,
        settings:[
          {
            health:2,
            count:4
          },
          {
            health:3,
            count:2
          }
        ]
      }
    ]
    }

});