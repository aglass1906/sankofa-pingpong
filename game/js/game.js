//GameEngine
//
"use strict";

// module.import Ball from "ball";
// import * from "clock.js";
// import * from "display.js";
// import * from "input.js";
// import * from "paddle.js";

//data definition
class GameEngine {
  constructor() {
    console.log("Hello from Game World");
    var canvas = document.getElementById("gameboard");
    // var model = {

    // };
    this.gameModel = {
      players: [],
      enemies: [],
      walls: [],

      BALL : 0,
      PLAYER : 1,
      CHAT_MESSAGE : 2,
      GAME_LOGIC: 3,

      //constant for game logic state
      WAITING_TO_START : 0,
      GAME_START : 1,
      GAME_OVER : 2,
      GAME_RESTART : 3,

      // the starting point of the movable objects
      ball: {x: 0, y: 0},
      player1: {x: 0, y: 0},
      player2: {x: 0, y: 0},
    };

    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.fillStyle = "white";

    this.keys = new KeyListener();

    this.player1 = new Paddle(5, 0, "player1");
    this.player1.y = this.height/2 - this.player1.height/2;
    this.display1 = new Display(this.width/4, 25, this.player1.name);

    this.player2 = new Player(this.width - 5 - 2, 0,"player2");
    this.player2.y = this.height/2 - this.player2.height/2;
    this.display2 = new Display(this.width*3/4, 25, this.player2.name);

    this.headsUpDisplay = new Display(0,0,"Headsup");

    this.ball = new Ball();
    this.ball.x = this.width/2;
    this.ball.y = this.height/2;
    this.ball.vy = Math.floor(Math.random()*12 - 6);
    this.ball.vx = 7 - Math.abs(this.ball.vy);

    //Initialize Sounds
    this.paddleSound = new Audio('sounds/pong_18782.mp3');
    this.paddleSound.volume = 0.20;

    this.winSound = new Audio('sounds/Ta Da.mp3');
    this.winSound.volume = 0.30;

    this.backgroundSound1 = document.getElementById("melody");
    this.backgroundSound1.volume = 0.10;

    this.backgroundSound2 = document.getElementById("base");
    this.backgroundSound2.volume = 0.60;

    this.backgroundSound1.play();
    this.backgroundSound2.play();

    //set the flag for testing if game is over
    this.gameOver = false;

    //score to end the game
    this.maxScore=10;

    // this.server = new gameServer();
    // gameServer.init();

  }
  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(this.width/2, 0, 2, this.height);

    this.ball.draw(this.context);

    this.player1.draw(this.context);
    this.player2.draw(this.context);

    this.display1.draw(this.context);
    this.display2.draw(this.context);

  };

  update(){
      if (this.paused)
        return;

        this.updateObjectPositions();
        this.AI_autoComputerPaddle();

        this.sendObjectChangesToServer();

        this.collision_detection();
        this.update_stats();
        this.updateScoreBoard();
  };

  updateObjectPositions() {
    if (this.paused)
      return;

    this.ball.update();

    this.player1.update(this.keys);
    this.player1.y = Math.min(this.height - this.player1.height, this.player1.y);
    this.player1.x = Math.min(this.width - this.player1.width, this.player1.x);

    this.player2.update(this.keys);
    this.player2.y = Math.min(this.height - this.player2.height, this.player2.y);
    this.player2.x = Math.min(this.width - this.player2.width, this.player2.x);

  };

  sendObjectChangesToServer(){
    //send the line segment to he server
    var data = {};
    data.dataType = this.gameModel.BALL;
    data.endX = this.ball.x;
    data.endY = this.ball.y;
    data.endVX = this.ball.vx;
    data.endYV = this.ball.vy;

//    this.server.sendMessageToServer(JSON.stringify(data));


  }

  sendMessageToServer(data){
    //websocketGame.socket.send(JSON.stringify(data));
    console.log(data);


    //simulate response from server
    var e = {};
    e.data = data;
    this.receiveMessageFromServer(e);

  }
  receiveMessageFromServer(e){
    var data = JSON.parse(e.data);
    if(data.dataType === this.gameModel.CHAT_MESSAGE) {
      //$("#chat-history").append("<li>" + data.sender + " said " + " data.message " + data.message + "</li>");

    } else if (data.dataType === this.gameModel.BALL) {
      this.ball.x = data.endX;
      this.ball.y = data.endY;
      this.ball.vx = data.endVX;
      this.ball.vy = data.endYV;

    } else if (data.dataType === this.gameModel.GAME_LOGIC) {

    }

  };

  collision_detection(){

      if (this.paused)
      return;

    //collision detection
    //collision detection - does ball collide with the player 2?
    if (this.ball.vx > 0) {
      if (this.player2.x <= this.ball.x + this.ball.width &&
        this.player2.x > this.ball.x - this.ball.vx + this.ball.width) {
          var collisionDiff = this.ball.x + this.ball.width - this.player2.x;
          var k = collisionDiff/this.ball.vx;
          var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
          if (y >= this.player2.y && y + this.ball.height <= this.player2.y + this.player2.height) {
            // collides with player
            this.ball.x = this.player2.x - this.ball.width;
            this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
            this.ball.vx = -this.ball.vx;
            this.paddleSound.play();
          }
      }
    } else {
      //collision detection - does ball collide with the player 1?
      if (this.player1.x + this.player1.width >= this.ball.x) {
        var collisionDiff = this.player1.x + this.player1.width - this.ball.x;
        var k = collisionDiff/-this.ball.vx;
        var y = this.ball.vy*k + (this.ball.y - this.ball.vy);
        if (y >= this.player1.y && y + this.ball.height <= this.player1.y + this.player1.height) {
          // collides with player
          this.ball.x = this.player1.x + this.player1.width;
          this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy*k);
          this.ball.vx = -this.ball.vx;
          this.paddleSound.play();
        }
      }
    }

    //collision detection - does ball collide Top and bottom walls
    if ((this.ball.vy < 0 && this.ball.y < 0) ||
    (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height)) {
      this.ball.vy = -this.ball.vy;
    }

    //does the fireball collide with a player
    if(this.player1.isFiring) {
      if (this.player2.x + this.player2.width >= this.player1.ball.x) {
        var collisionDiff = this.player2.x + this.player2.width - this.player1.ball.x;
        var k = collisionDiff/-this.player1.ball.vx;
        var y = this.player1.ball.vy*k + (this.player1.ball.y - this.player1.ball.vy);
        if (y >= this.player2.y && y + this.player1.ball.height <= this.player2.y + this.player2.height) {
          // collides with the left paddle
          this.player2.height -=2;
          this.player2.width +=2;

          this.player1.isFiring = false;

        }
      }
    }
    if(this.player2.isFiring) {
      if (this.player1.x + this.player1.width >= this.player2.ball.x) {
        var collisionDiff = this.player1.x + this.player1.width - this.player2.ball.x;
        var k = collisionDiff/-this.player2.ball.vx;
        var y = this.player2.ball.vy*k + (this.player2.ball.y - this.player2.ball.vy);
        if (y >= this.player1.y && y + this.player2.ball.height <= this.player1.y + this.player1.height) {
          // collides with the left paddle
          this.player1.height -=2;
          this.player1.width +=2;

          this.player2.isFiring = false;

        }
      }
    }

  };

  update_stats() {

    //check if the ball has passed a goal line for a score
    //right goal line
    //left goal line
    if (this.ball.x >= this.width) {
      this.score(this.player1);
      //this.headsUpDisplay.updateStatus("Player1 Scored!");
    }
    else if (this.ball.x + this.ball.width <= 0) {
      this.score(this.player2);
      //this.headsUpDisplay.updateStatus("Player2 Scored!");
    }

    //update the Scoreboard Display Values
    this.display1.value = this.player1.score;
    this.display2.value = this.player2.score;

  };

  ballHitsTopBottom() {
    var y = this.ball.y + this.ball.speed * this.ball.directionY;
    return y <0 || y > this.height;
  };

  ballHitsRightWall() {
    return this.ball.x + this.ball.speed * this.ball.directionX > this.width;
  };

  ballHitsLeftWall() {
    return this.ball.x + this.ball.speed * this.ball.directionX < 0;
  };
  AI_autoComputerPaddle() {
    var speed = 1.0;
    var direction = 1;
    var simulated_key_press = 0;

    // var x = this.Player1_Avitar.style.left;
    // var y = this.Player1_Avitar.style.top;

    var paddleY = this.player1.y + this.player1.height/2;
    if (paddleY > this.ball.y) {
      direction = -1;
      simulated_key_press = 83;
    }
    else {
      simulated_key_press = 87;
    }

    this.player1.y += speed * direction;

    // var player1Avitar = document.getElementById("paddleA");//app
    // player1Avitar.style.top = "" + (this.player1.y+5) + "px";
    // player1Avitar.style.left = "" + (this.player1.x -5)+ "px";

    // //update avitar
    // $("#paddleA").css("top", this.player1.y);
    // $("#paddleA").css("left", this.player1.x);

  };


  score(p) {
    this.winSound.play();

    // player scores
    p.score++;
    var player = p == this.player1 ? 0 : 1;


    //update the headsup display
    if (player == 0){
      this.headsUpDisplay.updateStatus("Goal Player 1!");
    }
    else {
      this.headsUpDisplay.updateStatus("Goal Player 2");
    }

    // set ball position
    this.ball.x = this.width/2;
    this.ball.y = p.y + p.height/2;

    //update the Scoreboard Display
    this.display1.value = this.player1.score;
    this.display2.value = this.player2.score;

    // set ball velocity
    this.ball.vy = Math.floor(Math.random()*12 - 6);
    this.ball.vx = 7 - Math.abs(this.ball.vy);
    if (player == 1)
    this.ball.vx *= -1;

    //increase the speed of the ball when someone scores
    this.ball.speed = this.ball.speed + .1;
    if(this.ball.speed > 1.0)
      this.ball.speed = 1.0;
  };

  isGameover(p){
    //is game over???
    if ( (this.player1.score >= this.maxScore) || (this.player2.score >= this.maxScore) ) {
      if(this.player1.score > this.player2.score) {
        var final_score = "(" + this.player1.score + " to " + this.player2.score + ")";
        this.headsUpDisplay.updateStatus("Game Over...Player 1 wins! " + final_score);
      }
      else {
        var final_score = "(" + this.player1.score + " to " + this.player2.score + ")";
        this.headsUpDisplay.updateStatus("Game Over...Player 2 wins! " + final_score);
      }
      this.paused = true;
      this.gameOver = true;
    }
    return this.gameOver;

  };

  updateScoreBoard(){

    //update the Scoreboard Display
    this.display1.value = this.player1.score;
    this.display2.value = this.player2.score;

  };
}
