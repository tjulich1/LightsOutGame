class Player {
    constructor(game, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.ctx = game.ctx;
        this.game = game;
        this.width = width;
        this.height = height;
        this.xvelocity = 0;
        this.yvelocity = 0;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FF0000";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill();
    }

    update() {
        this.x = (this.x + this.xvelocity) % this.ctx.canvas.width;
        this.y = (this.y + this.yvelocity) % this.ctx.canvas.height;
    }

    updateXVelocity(velocityChange) {
        this.xvelocity = velocityChange;
    }

    updateYVelocity(velocityChange) {
        this.yvelocity = velocityChange;
    }

}
