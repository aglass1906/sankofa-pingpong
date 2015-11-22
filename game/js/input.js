// input
//KEY LISTENER
"use strict";

class KeyListener {
  constructor() {
    this.pressedKeys = [];
    this.lastKeyPressed = "";

    //iniital key binding
    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));

  }
  keydown(e) {
    this.pressedKeys[e.keyCode] = true;
    this.lastKeyPressed = e.keyCode;

  };

  keyup(e) {
    this.pressedKeys[e.keyCode] = false;
    this.lastKeyPressed = "";
  };

  isPressed(key)  {
    return this.pressedKeys[key] ? true : false;
  }
  addKeyPressListener(keyCode, callback)  {
    document.addEventListener("keypress", function(e) {
      if (e.keyCode == keyCode)
      callback(e);
    });
  }
}
