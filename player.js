class Player {
    constructor(game, x, y, width, height, spritesheet) {
        this.x = x;
        this.y = y;
        this.ctx = game.ctx;
        this.game = game;
        this.width = width;
        this.height = height;
        this.xvelocity = 0;
        this.yvelocity = 0;
        this.spritesheet = spritesheet;
        this.currentKey = 'S';
    }

    draw() {
        if(this.currentKey === 'W' || this.currentKey === 'w') {
            this.ctx.drawImage(this.spritesheet, 0, 0,
                this.width, this.height, this.x, this.y,
                this.width, this.height);
        } else if(this.currentKey === 'A' || this.currentKey === 'a') {
            this.ctx.drawImage(this.spritesheet, 0, 1 * this.height,
                this.width, this.height, this.x, this.y,
                this.width, this.height);
        } else if(this.currentKey === 'S' || this.currentKey === 's' || this.currentKey === '' || this.currentKey === undefined) {
            this.ctx.drawImage(this.spritesheet, 0, 2 * this.height,
                this.width, this.height, this.x, this.y,
                this.width, this.height);
        } else {
            this.ctx.drawImage(this.spritesheet, 0, 3 * this.height,
                this.width, this.height, this.x, this.y,
                this.width, this.height);
        }
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
        if (this.x - this.width > this.ctx.canvas.width) {
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

    updateCurrentKey(key) {
        this.currentKey = key;
    }
}
