class Armored extends Enemy{
    constructor(game, x, y, width, height, player, walkSpriteSheet, attackSpriteSheet){
        
        //Possibly pass up a health value.
        super(game, x, y,width, height, 200, 0, 0, walkSpriteSheet, attackSpriteSheet);
        this.player = player;
    }

    update(){
        if(this.changeDirectionThresh === 0){
            this.findPlayer();
            this.changeDirectionThresh = 30;
        }else{
            this.changeDirectionThresh--;
        }
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
    //Update to better handle directional changes.
    findPlayer(){
        var xDist = Math.abs(this.x - this.player.x);
        var yDist = Math.abs(this.y - this.player.y);
        //get xVelocity;

        if(xDist >= yDist){
            if(this.player.x - this.x < 0){
                if(this.player.x - this.x === 0){
                    this.xVelocity = 0;
                }
                if(this.xVelocity >= 0){
                    this.xVelocity *= -1;
                    this.yVelocity = 0;
                }
                if(this.xVelocity === 0){
                    this.xVelocity = -2;
                    this.yVelocity = 0;
                }
                this.direction = 1;

            }else if(this.player.x - this.x > 0){
                if(this.xVelocity < 0){
                    this.xVelocity *= -1;
                    this.yVelocity = 0;
                }
                if(this.xVelocity === 0){
                    this.xVelocity = 2;
                    this.yVelocity = 0;
                }
                this.direction = 3;
            }
        }else{
             //get yVelocity
            if(this.player.y - this.y < 0){
                if(this.yVelocity >= 0){
                    this.yVelocity *= -1;
                    this.xVelocity = 0;
                }
                if(this.yVelocity == 0){
                    this.yVelocity = -2;
                    this.xVelocity = 0;
                }
                this.direction = 0;
            }
            if(this.player.y - this.y == 0){
                this.yVelocity = 0;
            }
            if(this.player.y - this.y > 0){
                if(this.yVelocity < 0){
                    this.yVelocity *= -1;
                    this.xVelocity = 0;
                }
                if(this.yVelocity == 0){
                    this.yVelocity = 2;
                    this.xVelocity = 0;
                }
                this.direction = 2;
            }
        }
    }
}