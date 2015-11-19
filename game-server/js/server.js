class gameServer {
  constructor() {
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


  }
  init(){
    this.p1 = new Paddle(5, 0, "player1");
    this.p1.y = this.height/2 - this.p1.height/2;
    this.display1 = new Display(this.width/4, 25, this.p1.name);

    this.p2 = new Paddle(this.width - 5 - 2, 0,"player2");
    this.p2.y = this.height/2 - this.p2.height/2;
    this.display2 = new Display(this.width*3/4, 25, this.p2.name);

    this.headsUpDisplay = new Display(0,0,"Headsup");

    this.ball = new Ball();
    this.ball.x = this.width/2;
    this.ball.y = this.height/2;
    this.ball.vy = Math.floor(Math.random()*12 - 6);
    this.ball.vx = 7 - Math.abs(this.ball.vy);


  }
    //
    // sendObjectChangesToServer(){
    //   //send the line segment to he server
    //   var data = {};
    //   data.dataType = this.gameModel.BALL;
    //   data.endX = this.ball.x;
    //   data.endY = this.ball.y;
    //   data.endVX = this.ball.vx;
    //   data.endYV = this.ball.vy;
    //
    //   this.sendMessageToServer(JSON.stringify(data));
    //
    //
    // }

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
}
