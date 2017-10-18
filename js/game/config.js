define(function() {
    'use strict';

    return {
      global:{
        width:460,
        height:320,
      },
      images:[
        "ball",
        "paddle",
        {
          prefix:"bricks",
          names:[
            "brick1","brick2","brick3","brick4"
          ]
        },
        {
          prefix:"background",
          names:[
            "background1",
          ]
        }
    ],
    bricks:[
      6,/*{
        totalCount:9,
        settings:[
          {
            health:2,
            count:3
          }
        ]
      },
      {
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
      }*/
    ]
    }

});