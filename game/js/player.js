// PADDLE
//
"use strict";

class Player {
  constructor(x,y, name) {
    this.x = x;
    this.y = y;
    this.vx = 4;
    this.vy = 4;
    this.width = 5;
    this.height = 28;
    this.score = 0;
    this.name = name;
    this.isFiring = false;
    this.ball = new Ball();
    this.fireSpeed = 8;
    //this.directionStrategy = keyStorke;
  };
  draw(ctx)  {
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if(this.isFiring == true) {
      this.ball.draw(ctx);
    }
  };
  update(PressedKeys) {
    this.keys = PressedKeys;
    //console.log("last key pressed = " + this.keys.lastKeyPressed);

    // Player direction based on arrow keys
    if (this.keys.isPressed(40)) { // DOWN
      this.y = Math.max(this.height, this.y + this.vy);
    } else if (this.keys.isPressed(38)) { // UP
      this.y = Math.max(0, this.y - this.vy);
    } else if (this.keys.isPressed(37)) { // LEFT
      this.x = Math.max(0, this.x - this.vx);
    } else if (this.keys.isPressed(39)) { // RIGHT
      this.x = Math.max(this.width, this.x + this.vx);
    } else if (this.keys.isPressed(32)) { // SPACE
      //this.ball.update();
      this.isFiring = true;
      this.fire();
      console.log("player fires");
    }

    if(this.isFiring == true) {
      this.ball.update();
    }

  };
  fire() {
    this.ball.width = 2;
    this.ball.height = 2;
    this.ball.x = this.x + this.width/2;
    this.ball.y = this.y + this.height/2;
    this.ball.vy = 0;
    this.ball.vx = -this.fireSpeed;

  };
};
