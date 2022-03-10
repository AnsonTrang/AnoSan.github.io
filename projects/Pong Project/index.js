/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  $('#button').hide();
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // semi-constant Variables
  let doc = {
    BOARD_WIDTH: $('#board').width(),
    BOARD_HEIGHT: $('#board').height(),
    PADDLE_WIDTH: $('.paddle').width(),
    PADDLE_HEIGHT: $('.paddle').height(),
    PADDLE_SPEED: 10,
    BALL_SPEED: 3,
    FRAME_RATE: 60,
    DECAY: 1.5,
  }
  const FRAMES_PER_SECOND_INTERVAL = 1000 / doc.FRAME_RATE;


  //non-constant variables
  let score = {
    leftID: $('#left'),
    rightID: $('#right'),
    scoreMax: 10,
  }

  // Game Item Objects
  var player1 = gameitem("#player1", 0, 0, doc.BOARD_HEIGHT/100);
  var player2 = gameitem("#player2", doc.BOARD_WIDTH - doc.PADDLE_WIDTH, 0, doc.BOARD_HEIGHT/100);
  var ball = gameitem(".ball", doc.BOARD_WIDTH/2, doc.BOARD_HEIGHT/2, doc.BALL_SPEED);
  var board = gameitem("#board", window.width/2, window.height/2, 0);
  function gameitem(itemID, x, y, predefinedItemSpeed){ //Creates a game item object, allowing for rendering of universal objects in less code
    var newitem = {
      itemID: itemID,
      x: x,
      y: y,
      velx: 0 + predefinedItemSpeed,
      vely: 0 + predefinedItemSpeed,
      penNum: 0,
    }
    // No need to have this anymore.
    return newitem;
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  ballReset();

  function newFrame() {
    render(player1);
    render(player2);
    render(ball);
    render(board);

    runPressedButtons();

    wallCollide(player1, 0);
    wallCollide(player2, 0);
    wallCollide(ball, -1);
    checkPaddleCollisions();

    paddleMovement(player1);
    movementDecay(player1);
    paddleMovement(player2);
    movementDecay(player2);


    ballMove();
    ballPoint();

    winCheck();
  }

  //Controls
  let controller = {
    w: {pressed: false, func: function w () {player1.vely = -(doc.PADDLE_SPEED)}},
    s: {pressed: false, func: function s () {player1.vely = doc.PADDLE_SPEED}},
    ArrowUp: {pressed: false, func: function up () {player2.vely = -(doc.PADDLE_SPEED)}},
    ArrowDown: {pressed: false, func: function down () {player2.vely = doc.PADDLE_SPEED}},
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function handleKeyDown(e) {
    (controller[e.key] && (controller[e.key].pressed = true))
  }

  function handleKeyUp(e) {
    (controller[e.key] && (controller[e.key].pressed = false))
    }

  function runPressedButtons() {
    Object.keys(controller).forEach(key => {
      controller[key].pressed && controller[key].func()
    })
  }

  function explosion(){
    $('<div class="blast"></div>').appendTo(board.itemID);
    $('.blast').css({
      left: ball.x,
      top: ball.y,
    }).animate({
      opacity: 0.25,
      width: 100,
    }, 200, function() {
      $('blast').css({
        opacity: 1,
        width: 0,
      })
    })
  }

  function ballReset() { //Resets ball position.
    ball.x = doc.BOARD_WIDTH/2;
    ball.y = doc.BOARD_HEIGHT/2;
    //some delay
    ball.velx = 0;
    ball.vely = 0;
    setTimeout(() => {
      //shoots the ball out in a random direction
      ball.velx = doc.BALL_SPEED * Math.sign(Math.random()-.5);
      ball.vely = doc.BALL_SPEED * Math.sign(Math.random()-.5);
    }, 1000)
  }

  function ballPoint() { //Determines which player gets the point and begins the game over again.
    if(ball.x < 0 && isCollide(ball, board) === false) {
      pointTo(player1);
      explosion();
      ballReset();
    }
    if(ball.x > doc.BOARD_WIDTH && isCollide(ball, board) === false) {
      pointTo(player2);
      explosion();
      ballReset();
    }
  }

  function ballMove() { //Sets the course of the ball.
    ball.y += ball.vely;
    ball.x += ball.velx;
  }

  function movementDecay(player){ //makes paddles slippery.
    player.vely /= doc.DECAY;
  }

  function wallCollide(gameitem, multiplier) { //Checks whether a game item hit the roof or the ceiling of the board, then, it applies a multiplier to the velocity.
    (gameitem.y < 0 && gameitem.vely < 0) ? gameitem.vely = (multiplier * gameitem.vely) : null;
    ((gameitem.y + $(gameitem.itemID).height()) > doc.BOARD_HEIGHT && gameitem.vely > 0 ) ? gameitem.vely = (multiplier * gameitem.vely) : null;
  }

  function isCollide(obj1, obj2) { //Checks for whether the two checked objects are colliding.
    // sides of the square1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.leftX + $(obj1.itemID).width();
    obj1.bottomY = obj1.topY + $(obj1.itemID).height();
    // TODO: Do the same for square2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.leftX + $(obj2.itemID).width();
    obj2.bottomY = obj2.topY + $(obj2.itemID).height();
    // TODO: Return true if they are overlapping, false otherwise
  return (obj1.rightX > obj2.leftX && obj1.leftX < obj2.rightX && obj1.bottomY > obj2.topY && obj1.topY < obj2.bottomY) ? true : false;
  }

  function checkPaddleCollisions() {
    (isCollide(ball, player2) && ball.velx > 0)? ball.velx *= -1.2: null;
    (isCollide(ball, player1) && ball.velx < 0)? ball.velx *= -1.2: null;
  }

  function paddleMovement(player){
    player.y += player.vely;
  }

  function winCheck() {
    switch (win()) {
      case 1:

      endGame();
      break;

      case 2:

      endGame();
      break;
    }
  }

  function win() {
    return (player1.penNum >= score.scoreMax) ? 1 :
    (player2.penNum >= score.scoreMax) ? 2 : null;
  }

  function pointTo (player) {
    player.penNum = player.penNum + 1;
    if(player == player1) {
      $(score.leftID).text(player1.penNum);
    }
    if(player == player2) {
      $(score.rightID).text(player2.penNum);
    }
  }


  function render(gameitem) {
    $(gameitem.itemID).css({
      "left": gameitem.x,
      "top": gameitem.y
    })
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    $('#button').show();

    // turn off event handlers
    $(document).off();
  }
  
}