// BALL
//
"use strict";

class Ball {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.width = 6;
    this.height = 6;
    this.speed = 0.70;
  };
  update() {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
  };
  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
