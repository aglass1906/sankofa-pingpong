//DISPLAY
//
"use strict";

class Display {
  constructor(x, y, title) {
    this.x = x;
    this.y = y;
    this.value = 0;
    this.title = title;
  };
  draw(p) {
    p.fillText(this.value, this.x, this.y);
  };
  updateStatus(msg) {

    var output = ">> " + this.title + " " + msg;
    document.getElementById("status").textContent = output;

  };
}
