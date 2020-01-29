class Player {
    constructor(game, x, y, width, height, image) {
        this.animation = new Animation(image, 0, 0, 17, 17, 0.5, 8, true, false);
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

        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 2);
        // this.ctx.beginPath();
        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.rect(this.x, this.y, this.width, this.height);
        // this.ctx.fill();
    }

    update() {
        this.x += this.xvelocity;
        this.y += this.yvelocity;
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

    updateXVelocity(velocityChange) {
        this.xvelocity = velocityChange;
    }

    updateYVelocity(velocityChange) {
        this.yvelocity = velocityChange;
    }

}
