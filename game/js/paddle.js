// PADDLE
//
"use strict";

class Paddle {
  constructor(x,y, name) {
    this.x = x;
    this.y = y;
    this.vx = 4;
    this.vy = 4;
    this.width = 2;
    this.height = 28;
    this.score = 0;
    this.name = name;
  };
  draw(p)  {
    p.fillRect(this.x, this.y, this.width, this.height);
  };
  update(inputManager) {
    this.keys = inputManager;
    //console.log("last key pressed = " + this.keys.lastKeyPressed);
    // addle - direction based on the arrow keys
    if (this.keys.isPressed(83)) { // DOWN
      this.y = Math.min(this.height - this.height, this.y + 4);
    } else if (this.keys.isPressed(87)) { // UP
      this.y = Math.max(0, this.y - 4);
    }

  };
}
