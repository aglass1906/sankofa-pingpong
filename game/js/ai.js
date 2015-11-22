class NPC_AI {
  constructor(player) {
    this.player = player;
  }
  followTargetStrategy(targetX, targetY) {
    var speed = 1.0;
    var direction = 1;
    var simulated_key_press = 0;
    var target = {x: targetX, y: targetY};

    // var x = this.Player1_Avitar.style.left;
    // var y = this.Player1_Avitar.style.top;

    var midPoint = this.player.y + this.player.height/2;
    if (midPoint > this.target.y) {
      direction = -1;
      simulated_key_press = 83;
    }
    else {
      simulated_key_press = 87;
    }

    this.player.y += speed * direction;

    // var player1Avitar = document.getElementById("paddleA");//app
    // player1Avitar.style.top = "" + (this.player1.y+5) + "px";
    // player1Avitar.style.left = "" + (this.player1.x -5)+ "px";

    // //update avitar
    // $("#paddleA").css("top", this.player1.y);
    // $("#paddleA").css("left", this.player1.x);

  };



}
