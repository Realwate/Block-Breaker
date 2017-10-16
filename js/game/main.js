require.config({
    baseUrl:"./js/game",
});

require(["Game"],Game=>{
    var canvas = document.getElementById("canvas");
    new Game(canvas).start();
})

// require(["a"],a=>{
//     debugger;
// })