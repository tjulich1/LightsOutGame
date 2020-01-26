class Armored extends Enemy{
    constructor(game, x, y, width, height, player){
        //filler numbers for health, xvelo, and yvelo.
        //pass in player currently because the board does not
        //have a way to locate the player.
        super(game, x, y,width, height, 200, 5, 5);
        this.player = player;

    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#00ff00";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill(); 
    }

    update(){
        this.findPlayer();
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if (this.x + this.width < 0) {
            this.x = this.ctx.canvas.width;
        }
        if (this.y + this.height < 0) {
            this.y = this.ctx.canvas.height;
        }
        if (this.x > this.ctx.canvas.width) {
            this.x = -this.width;
        }
        if (this.y > this.ctx.canvas.height) {
            this.y = -this.height;
        }
    }

    //Finds the player and chases.
    findPlayer(){

        //get xVelocity;
        if(this.player.x - this.x < 0){
            if(this.xVelocity >= 0){
                this.xVelocity *= -1;
            }
            if(this.xVelocity == 0){
                this.xVelocity = -5;
            }
        }
        if(this.player.x - this.x == 0){
            this.xVelocity = 0;
        }
        if(this.player.x - this.x > 0){
            if(this.xVelocity < 0){
                this.xVelocity *= -1;
            }
            if(this.xVelocity == 0){
                this.xVelocity = 5;
            }
        }

        //get yVelocity
        if(this.player.y - this.y < 0){
            if(this.yVelocity >= 0){
                this.yVelocity *= -1;
            }
            if(this.yVelocity == 0){
                this.yVelocity = -5;
            }
        }
        if(this.player.y - this.y == 0){
            this.yVelocity = 0;
        }
        if(this.player.y - this.y > 0){
            if(this.yVelocity < 0){
                this.yVelocity *= -1;
            }
            if(this.yVelocity == 0){
                this.yVelocity = 5;
            }
        }
    }
}