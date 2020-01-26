class Enemy {
    constructor(game, x, y, width, height, health, xVelocity, yVelocity){
        this.ctx = game.ctx;
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this. health = health;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }

    update(){
        this.x = (this.x + this.xvelocity) % this.ctx.canvas.width;
        this.y = (this.y + this.yvelocity) % this.ctx.canvas.height;
    }
}