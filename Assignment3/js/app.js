// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y; 
    this.startTime = 0;
    this.speed  = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt; 
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y){

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y; 
    this.distance = 20;
    
    console.log("Player constructed");
    
    this.handleInput = function(inputKey){
        if (inputKey=='right'){
            this.x += this.distance;
        }
        if (inputKey=='left'){
            this.x -= this.distance;
        }
        if (inputKey=='up'){
            this.y -= this.distance;
        }
        if (inputKey=='down'){
            this.y += this.distance;
        }
        console.log('input key:' + inputKey);
        this.update();
    }
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.render();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



let player = new Player(200,300);
let allEnemies = [
    new Enemy(1,50,5),
    new Enemy(2,50,10),
    new Enemy(10,100,50),
    new Enemy(20,100,20),
    new Enemy(10,200,20),
    new Enemy(20,200,10),
    new Enemy(10,50,50),
    new Enemy(20,50,20),
    new Enemy(-2000,1,500),
    new Enemy(-2000,100,500),
    new Enemy(-5000,200,500),
];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    //console.log('key up');
    //console.log(player);
    //console.log('e.keyCode'+e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});
