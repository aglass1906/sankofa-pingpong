// PADDLE
//
"use strict";

class Paddle {
  constructor(x,y, name) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 28;
    this.score = 0;
    this.name = name;
  };
  draw(p)  {
    p.fillRect(this.x, this.y, this.width, this.height);
  };
}
