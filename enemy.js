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

    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#f2f2f2";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill(); 
    }
}