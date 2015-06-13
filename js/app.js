// Enemies our player must avoid
var Actor = function(x,y,speedX,speedY, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y; 
};

Actor.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(x,y,speedX,speedY, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Actor.call(this,x,y,speedX,speedY, sprite);
};

Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speedX;
    if (this.x > 505)
        this.reset();
};

// Reset the Enemy after the enemies get to the end of the canvas
Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = 75*getRandomInt(1, 4);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.HandlesCollision = function(Player) {
    if ((Math.abs(this.x - Player.x)<75) && (Math.abs(this.y - Player.y)<75))
    {
        if (Player.score <= 0) //If the score is less than 0 the game ends and a new one begins
        {
            alert('You lose!! A new game starts!');
        }
        else 
        {
            Player.score--; //If there is a collision the players score is subtracted by 1  
            $("#score").html(player.score);
        }
        return true;
    }
    else return false;
};

var Player = function(x,y,speedX,speedY,sprite,score) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Actor.call(this,x,y,speedX,speedY, sprite);
    this.score = score;
};

Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;
// Reset the player after a collision
Player.prototype.reset = function() {
    this.x = 202; 
    this.y = 412;
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    $("#score").html(this.score);
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    this.speedX = 0;
    this.speedY = 0;
    if (this.y < 72)//Check if the palyer reached the water
    {
        this.score++;
        $("#score").html(this.score);
        this.reset();
    }
    $("#score").html(this.score);
};

Player.prototype.handleInput = function(pressedKey) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(pressedKey === 'up')
    {
        if(this.y < 64)// Check is there room to move up
        {
            this.speedY = 0;
            this.speedX = 0;
        }
        else
        {
            this.speedY = -83;
            this.speedX = 0;
        }
    }
   if(pressedKey === 'down')
    {
        if(this.y >= 410)// Check is there room to move down
        {
            this.speedY = 0;
            this.speedX = 0;
        }
        else
        {
            this.speedY = 83;
            this.speedX = 0;
        }
    }
    if(pressedKey === 'right')
    {
        if(this.x > 403)// Check is there room to move right
        {
            this.speedY = 0;
            this.speedX = 0;
        }
        else
        {
        this.speedX =  101;
        this.speedY = 0;
        }
    }
    if(pressedKey === 'left')
    {
        if(this.x < 101)// Check is there room to move left
        {
            this.speedY = 0;
            this.speedX = 0;
        }
        else
        {
        this.speedX = -101;
        this.speedY = 0;
        }
    }
};

//This function returns a random int in the given limits - min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

 
//Creating instances of the objects Enemy andPlayer
var allEnemies = [];
for(var i=0; i<4; i++)//Creating 4 bugs(Enemys)
{
    var enemy = new Enemy(0,75*getRandomInt(1, 4),getRandomInt(50, 100),0,'images/enemy-bug.png');
    allEnemies[i] = enemy; 
}
//Creating the boy (Player)
var player = new Player(202,412,0,0,'images/char-boy.png',0);
$("#score").html(player.score);

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
