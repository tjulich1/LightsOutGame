class Armored extends Enemy{
    constructor(game, x, y, width, height, player, walkSpritesheet){
        //filler numbers for health, xvelo, and yvelo.
        //pass in player currently because the board does not
        //have a way to locate the player.
        super(game, x, y,width, height, 200, 2, 2);
        this.player = player;
        this.walkAnimationUp = new Animation(walkSpritesheet, 0, 0, 64, 64, .15, 9, true, false);
        this.walkAnimationLeft = new Animation(walkSpritesheet, 0, 64, 64, 64, .15, 9, true, false);
        this.walkAnimationDown = new Animation(walkSpritesheet, 0, 128, 64, 64, .15, 9, true, false);
        this.walkAnimationRight = new Animation(walkSpritesheet, 0, 192, 64, 64, .15, 9, true, false);
        this.direction = 1;

    }

    draw(){
        if(this.direction === 1){
            this.walkAnimationUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }else if(this.direction === 2){
            this.walkAnimationLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }else if(this.direction === 3){
            this.walkAnimationDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }else{
            this.walkAnimationRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }
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
                this.xVelocity = -2;
            }
            this.direction = 2;
        }
        if(this.player.x - this.x == 0){
            this.xVelocity = 0;
        }
        if(this.player.x - this.x > 0){
            if(this.xVelocity < 0){
                this.xVelocity *= -1;
            }
            if(this.xVelocity == 0){
                this.xVelocity = 2;
            }
            this.direction = 4;
        }

        //get yVelocity
        if(this.player.y - this.y < 0){
            if(this.yVelocity >= 0){
                this.yVelocity *= -1;
            }
            if(this.yVelocity == 0){
                this.yVelocity = -2;
            }
            this.direction = 1;
        }
        if(this.player.y - this.y == 0){
            this.yVelocity = 0;
        }
        if(this.player.y - this.y > 0){
            if(this.yVelocity < 0){
                this.yVelocity *= -1;
            }
            if(this.yVelocity == 0){
                this.yVelocity = 2;
            }
            this.direction = 3;
        }
    }
}