// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.respawn();
  if(player.victory){// when player wins games
    // pauses movement of enemies
    player.victorious(); // function call for message that say you won!
  } else if (player.heartsLost == 3){
    player.allLivesLost = true; // defines game over
    player.defeat(); // call function that will show game over message
  } else{
  this.x = this.x + this.speed + (1 * dt);//before player wins, move enemies
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.respawn = function() {
  if (this.x > 550){ //when off canvas, reset position of enemy to move across again
    this.x = -100;
  }
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//-------------------------------------------------------------------------
// Enemies our player must avoid
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.victory = false;
    this.allLivesLost = false;
    this.gemCollected = 0;
    this.heartsLost = 0;
    //whether player has won or not
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // when bug enemy x is equal to player x value +/- 80 and y values are equal then collision has occured
    this.collision();

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // draw player
};
//-------------------------------------------------------------------------

Player.prototype.handleInput = function(key){
// if the player has'nt won and hasnt lost all their lives continue
if (this.victory === false && this.allLivesLost === false){
  if (key === "up" || key === "down"){
    switch(key) {
      case 'up':
        if (this.y > -20){ // when UP is pressed before last row before boundery
          this.y = this.y - 80; // move up to next row
        }
        if (this.y === -20){ //if last row is reached then the game is won
          this.victory = true;
        }
        break;
      case 'down':
        if (this.y < 380){ // when DOWN is pressed
          this.y = this.y + 80; //move to row bellow
        }
        break;
      default:
          return;
    }
  }

  if (key === "left" || key === "right"){
    switch(key) {
      case 'left':
          if (this.x > 0){ // left most boundery
            this.x = this.x - 100;// move to column to the left
          }
          break;
      case 'right':
          if (this.x < 400){// right most boundery
            this.x = this.x + 100; //more to column to the right
          }
          break;
      default:
          return;
    }
  }

}
};

Player.prototype.collision = function(){

  for(var i = 0; i < allEnemies.length; i++){
    // conditions to check if any enemy is in the same space as the player
    if (allEnemies[i].x > this.x -80 && allEnemies[i].x < this.x + 80 && allEnemies[i].y === this.y){
      //resting the player position
      this.reset(); // position player back to  original location
      allHearts[this.heartsLost].y = 600;
      this.heartsLost++;
      return true;
    }
  }

  for(var j = 0; j < allGems.length; j++){
    // conditions to check if any enemy is in the same space as the player
    if (allGems[j].x > this.x -80 && allGems[j].x < this.x + 80 && allGems[j].y === this.y){
      //resting the player position
      allGems[j].x = 5 + (45 * player.gemCollected); // creates offset of 45 units to the right of last gem drawn
      allGems[j].y = 520; // positions as bottom of canvas
      allGems[j].v = 35.438596491; //sets the width of gem drawn on canvas
      allGems[j].w = 60; // sets the height of gem drawn on canvas
      player.gemCollected++;

    }
  }

};

Player.prototype.victorious = function(){
  winner.x = 10;
  winner.y = 200;
  //coordinates being image into view
};

Player.prototype.defeat = function(){
  gameOver.x  = 10;
  gameOver.y = 200;
  //coordinates being image into view
};

Player.prototype.reset = function(){
  this.x = 200;
  this.y = 380;
  //coordinates being player back to starting position

};

var Gem = function(gemColor){
  var gemRepo = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
  this.x = -110;
  this.y = -110;
  this.v = 101;//sets the width of gem drawn on canvas
  this.w = 171;// sets the height of gem drawn on canvas
  this.sprite = gemRepo[gemColor]; // access to specific gem color
  this.spawnGem(); // draws gem randomly on canvas over bug path way
};

Gem.prototype.spawnGem = function(){
// randomly allocated a y coordinate with in the confines of the 3 lanes with in which the bug travel
  var yrando = Math.random(); //generate yrandom decimal < 1,  decimal > 0
  if (yrando > 0.666666666){ // deviding yrandom number ranger into 3 of 3 to define this.y (row)
    console.log("top row ");
    this.y = 60;
  } if (yrando < 0.666666666 && yrando > 0.333333333){ // 2 of 3
    console.log("middle row ");
    this.y = 140;
  } if (yrando < 0.333333333) {// 1 of 3
    console.log("bottom row ");
    this.y = 220;
  }

// randomly allocated a x coordinate with in the confines of the 5 with in the 5 collumns
  var xrando = Math.random();
  if (xrando > 0.8){ // deviding xrandom number ranger into 1 of 5 to define this.x (column)
    console.log("x = 0");
    this.x = 0;
  } if (xrando < 0.8 && xrando > 0.6){ // 2 of 5  columns
    console.log("x = 100");
    this.x = 100;
  } if (xrando < 0.6 && xrando > 0.4){ // 3 of 5 columns
    console.log("x = 200");
    this.x = 200;
  } if (xrando < 0.4 && xrando > 0.2){ // 4 of 5 columns
    console.log("x = 300");
    this.x = 300;
  } if (xrando < 0.2) {// 5 of 5 columns
    this.x = 400;
    console.log("x = 400");
  }
  console.log(xrando);

};

Gem.prototype.render = function(gemCol) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.v, this.w);
};

Gem.prototype.update = function(){

};

var Heart = function(x, y){
  this.x = x;
  this.y = y;
  this.v = 35.438596491; //sets the width of heart drawn on canvas
  this.w = 60; //sets the height of heart drawn on canvas
  this.sprite = 'images/Heart.png';
};
Heart.prototype.render = function(gemCol) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.v, this.w);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//
var Winner = function(){
  this.sprite = 'images/good job.png';
  this.x = 10;
  this.y = 600; // initially drawn off canvas
};

Winner.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var GameOver = function(){
  this.sprite = 'images/game over.png';
  this.x = 10;
  this.y = 600; // initially drawn off canvas
};

GameOver.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [ //different starting points to randomise enemies
  new Enemy(0, 220, 1),
  new Enemy(-445, 220, 1),
  new Enemy(-125, 220, 1),
  new Enemy(-100, 140, 2),
  new Enemy(-330, 140, 2),
  new Enemy(-280, 60, 3),
  new Enemy(-570, 60, 3)
];

var player = new Player(200, 380);

var allGems = [
  new Gem(0),
  new Gem(1),
  new Gem(2)
];

var allHearts = [
  new Heart(360, 525),
  new Heart(405, 525),
  new Heart(450, 525)
];

var winner = new Winner();
var gameOver = new GameOver();





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
