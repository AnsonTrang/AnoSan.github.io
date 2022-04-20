/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //Snake Game, except you can't lose at all. The game can also play itself.

  // Constant Variables
  var FRAME_RATE = 20;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var BOARD_HEIGHT = $("#board").height();
  var BOARD_WIDTH = $("#board").width();
  var defaultSpeed = 10;
  var primaryShape = 10;
  // Game Item Objects
  var snake = gameItemFactory(".snake");
  var apple = gameItemFactory("#apple");
  console.log(snake);
  var body = [snake];

  function gameItemFactory(id) {
    var item = {
      id: id,
      x: 0,
      y: 0,
      height: primaryShape,
      width: primaryShape,
      velx: 0,
      vely: 0,
      d: null,
    }
    return item;
  }
  // one-time setup
  randomPos(snake);
  randomPos(apple);
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)                          // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    runPressedButtons();
    direction(snake);
    move(snake);
    render(snake);
    render(apple);
    tailRender();
    eat(snake, apple);
    
    border(snake);
    //console.log(snake.x + " " + snake.y);
    
  }
  
  /* 
  Called in response to events.
  */
  let controller = {
    w: {pressed: false, func: function w () {snake.d = "up"}},
    s: {pressed: false, func: function s () {snake.d = "down"}},
    a: {pressed: false, func: function a () {snake.d = "left"}},
    d: {pressed: false, func: function d () {snake.d = "right"}},
    ArrowUp: {pressed: false, func: function up () {snake.d = "up"}},
    ArrowDown: {pressed: false, func: function down () {snake.d = "down"}},
    ArrowLeft: {pressed: false, func: function left () {snake.d = "left"}},
    ArrowRight: {pressed: false, func: function right () {snake.d = "right"}},
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function tailMove() {
    let tail = body.pop(body[1]);
    
  }

  function tailRender () {
    for(var i=1; i < body.length; i++) {
      body[i].x = body[i - 1].x;
      body[i].y = body[i - 1].y;
      //body[i].d = body[i - 1].d
      render(body[i]);
    }
  }

  function addBody () {
    var newID = "s"+body.length;
    var newSegment = gameItemFactory("." + newID);
    var tail = body[body.length - 1];
    //console.log(tail);
    newSegment.x = tail.x;
    newSegment.y = tail.y;

    $("<div>")
    .addClass(newID)
    .css({
      "opacity": 0.2,
      "background-color": "blue",
      "position": "absolute",
      "left": newSegment.x,
      "top": newSegment.y,
      "width": "10px",
      "height": "10px",
    })
    .appendTo("#board");
    
    //newSegment.d = tail.d;
    //console.log(newSegment);
    body.push(newSegment);
  }

  function eat (gameitem, apple) {
    if (gameitem.x === apple.x && gameitem.y === apple.y) {
      randomPos(apple);
      
      addBody();
    }
  }
  
  function randomPos (gameitem) {
    var x = Math.ceil(Math.round(Math.random() * ((BOARD_WIDTH - primaryShape)) /primaryShape) * primaryShape);
    var y = Math.ceil(Math.round(Math.random() * ((BOARD_HEIGHT - primaryShape)) /primaryShape) * primaryShape);

    gameitem.x = x;
    gameitem.y = y;
  }

  function border (gameitem) {
    if (gameitem.x < 0) {
      endGame();
    }
    if (gameitem.y < 0) {
      endGame();
    }
    if ($(gameitem.id).width() + gameitem.x > BOARD_WIDTH) {
      endGame();
    }
    if($(gameitem.id).height() + gameitem.y > BOARD_HEIGHT) {
      endGame();
    }
  }
  
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
  
  /*function beforeDirection(gameitem, payload) {
    switch (gameitem.d) {
      case "up":

        payload;
      break;
    }
  }*/

  function direction(gameitem) {
    var stop = 0;
    var sub = -defaultSpeed;
    var add = defaultSpeed; 

    switch (gameitem.d) {
      case "up": 
        gameitem.velx = stop;
        gameitem.vely = sub;
      break;
      case "down": 
        gameitem.velx = stop;
        gameitem.vely = add;
      break;
      case "left": 
        gameitem.vely = stop;
        gameitem.velx = sub;
      break;
      case "right":
        gameitem.vely = stop;
        gameitem.velx = add;
      break;
    }
  }
  
  function move(gameitem) {
    gameitem.x += gameitem.velx;
    gameitem.y += gameitem.vely;
  }

  function render(gameitem) {
    $(gameitem.id).css({
      "left": gameitem.x,
      "top": gameitem.y
    })
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
