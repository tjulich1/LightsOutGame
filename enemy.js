class Enemy {
    constructor(game, x, y, width, height, health, xVelocity, yVelocity, spriteWalk){
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
                        new Animation(spriteWalk, 0, 192, 64, 64, .15, 9, true, false)];
        this.changeDirectionThresh = 30;
    }

    draw(){
        this.animations[this.direction].drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }
}