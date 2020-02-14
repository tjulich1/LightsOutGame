class Enemy {
    constructor(game, x, y, width, height, health, xVelocity, yVelocity, spriteWalk, spriteAttack){
        this.ctx = game.ctx;
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.direction = 0;
        this.animations = [new Animation(spriteWalk, 0, 0, 64, 64, .15, 9, true, false),
                        new Animation(spriteWalk, 0, 64, 64, 64, .15, 9, true, false),
                        new Animation(spriteWalk, 0, 128, 64, 64, .15, 9, true, false),
                        new Animation(spriteWalk, 0, 192, 64, 64, .15, 9, true, false),
                        new Animation(spriteAttack, 0, 0, 64, 64,.15, 6, true, false),
                        new Animation(spriteAttack, 0, 64, 64, 64, .15, 9, true, false),
                        new Animation(spriteAttack, 0, 128, 64, 64, .15, 9, true, false),
                        new Animation(spriteAttack, 0, 192, 64, 64, .15, 9, true, false)];
        this.changeDirectionThresh = 0;
        this.attackThresh = 0;
        this.attack = false;
        this.dead = false;
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        this.target = null;
    }

    draw(){
        if(this.attack){
            if(this.attackThresh === 0){
                this.animations[this.direction + 4].drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        }else if( this.dead){

        }else{
            this.animations[this.direction].drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }
    }

    collide(other){
        return (this.boundingBox.left < other.boundingBox.right && this.boundingBox.right > other.boundingBox.left
                && this.boundingBox.top < other.boundingBox.bottom && this.boundingBox.bottom > other.boundingBox.top);
    }
}