require.config({
    baseUrl:"./js/game",
    paths: {
      config:'config/index'
  }
});

require(["Game"],Game=>{
    var canvas = document.getElementById("canvas");
    new Game(canvas).start();
})
