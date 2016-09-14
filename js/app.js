// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.speed = speed;

    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {


    this.respawn();
    if(player.victory){// when player wins games
      // pauses movement of enemies
      player.victorious();
    } else {
    this.x = this.x + this.speed + (1 * dt);//before player wins, move enemies
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

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
    var victory;
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
    //console.log(allEnemies[1].y);

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//-------------------------------------------------------------------------

Player.prototype.handleInput = function(key){
  if (key === "up" || key === "down"){
    switch(key) {
      case 'up':
        if (this.y > -20){ // when UP is pressed before last row before boundery
          this.y = this.y - 80; // move up to next row
          this.victory = false;
        }
        if (this.y === -20){ //if last row is reached then the game is won
          this.victory = true;
        }
        break;
      case 'down':
        if (this.y < 380){ // when DOWN is pressed
          this.y = this.y + 80; //move to row bellow
          this.victory = false;
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
};

Player.prototype.collision = function(){

  for(var i = 0; i < allEnemies.length; i++){
    // conditions to check if any enemy is in the same space as the player
    if (allEnemies[i].x > this.x -80 && allEnemies[i].x < this.x + 80 && allEnemies[i].y === this.y){

      //resting the player position
      this.reset(); // position player back to  original location

      return true;
    }
  }


};

Player.prototype.victorious = function(){
  ctx.font = "60px Arial";
  ctx.fillText("YOU WON!!!",70,45);
};


Player.prototype.reset = function(){
  this.x = 200;
  this.y = 380;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [ //different starting points to randomise enemies
  new Enemy(0, 220, 1),
  new Enemy(-445, 220, 1),
  new Enemy(-125, 220, 1),
  new Enemy(-100, 140, 2),
  new Enemy(-330, 140, 2),
  new Enemy(-280, 60, 3),
  new Enemy(-570, 60, 3)
];

player = new Player(200, 380);




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
