// Enemies our player must avoid

//
var Enemy = function(x,y,speedX,speedY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y; 
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speedX;
}

// Reset the Enemy after the enemies get to the end of the canvas
Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = 75*getRandomInt(1, 4);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.HandlesCollision = function(Player) {
    //console.log("collision");
    //console.log("Enemy x:" + this.x);
    //console.log("Player x:" + Player.x);
    //console.log("Enemy y:" + this.y);
    //console.log("Player y:" + Player.y);
    if ((Math.abs(this.x - Player.x)<75) && (Math.abs(this.y - Player.y)<75))
    {
        //console.log("reset");
       // console.log("x:" + Math.abs(Enemy.x - Player.x));
        //console.log("y:" + Math.abs(Enemy.y === Player.y));
        if (Player.score <= 0)
        {
            console.log("You Lose!!!!");
            this.reset();
            Player.reset();
            Player.score = 0;
          //  $("#score").val(player.score);
            $( "#score" ).attr( "title", player.score );
        }
        else 
            {
                Player.score--;
              //  $("#score").val(player.score);
                $( "#score" ).attr( "title", player.score );
            }
        return true;
    }
    else return false;
}

var Player = function(x,y,moveX,moveY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.moveX = moveX;
    this.moveY = moveY;
    this.x = x;
    this.y = y; 
    this.score = 0;
    this.lastWan = 0;
   // console.log(this.score);
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Reset the player after a collision
Player.prototype.reset = function() {
    this.x = 202; 
    this.y = 412;
    this.lastWan = 0;
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log("update player");
    this.x = this.x + this.moveX;
    this.y = this.y + this.moveY;
    this.moveX = 0;
    this.moveY = 0;
}

Player.prototype.handleInput = function(pressedKey) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log("handleInput");
    //console.log(pressedKey);
    if(pressedKey === 'up')
    {
        if(this.y < 64)
        {
            this.moveY = 0;
            this.moveX = 0;
        }
        else
        {
            this.moveY = -85;
            this.moveX = 0;
        }
    }
   if(pressedKey === 'down')
    {
        if(this.y >= 410)
        {
            this.moveY = 0;
            this.moveX = 0;
        }
        else
        {
            this.moveY = 85;
            this.moveX = 0;
        }
    }
    if(pressedKey === 'right')
    {
        if(this.x > 403)
        {
            this.moveY = 0;
            this.moveX = 0;
        }
        else
        {
        this.moveX =  101;
        this.moveY = 0;
        }
    }
    if(pressedKey === 'left')
    {
        if(this.x < 101)
        {
            this.moveY = 0;
            this.moveX = 0;
        }
        else
        {
        this.moveX = -101;
        this.moveY = 0;
        }
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies  
// Place the player object in a variable called player
var allEnemies = [];
for(var i=0; i<4; i++)
{
    var enemy = new Enemy(0,75*getRandomInt(1, 4),getRandomInt(50, 100),0);
    allEnemies[i] = enemy; 
}
//var Enemy2 = new Enemy(0,75*getRandomInt(1, 4),getRandomInt(5, 10),0);
//var Enemy3 = new Enemy(0,75*getRandomInt(1, 4),getRandomInt(5, 10),0);
var player = new Player(202,412,0,0);
$("#score").append(player.score);



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
