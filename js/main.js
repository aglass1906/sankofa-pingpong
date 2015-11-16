//main
// import GameEngine from './js/game';
"use strict";

function App() {

  var version = "v1.3";

  // Initialize our game instance
  console.log("Game Initializing...");

  //create the game world
  this.gameEngine = new GameEngine();

  //create the clock
  this.clock = new Clock("clock",+500, "ETC");


  //initialization of the game
  this.init = function() {

    // Call the main loop again at a frame rate of 30fps
    var that = this;
    setInterval(function() {
      that.gameLoop();
    },33.3333);
  }

  //the game loop
  this.gameLoop = function() {

    //update the game world
    this.gameEngine.update();

    //draw the objects
    this.gameEngine.draw();

    //check for end of game
    this.gameEngine.isGameover();
  }

}

//When HTML DOM document is ready
function onReady() {

  //update CSS elements before starting
  document.getElementById("BIG_TITLE").style.color = "darkblue";

  window.app = new App();
  app.init();
}
window.onload = onReady;
