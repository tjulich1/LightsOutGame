class Player {
    constructor(game, x, y, width, height, spritesheet, healthBar) {
        this.x = x;
        this.y = y;
        this.ctx = game.ctx;
        this.game = game;
        this.width = width;
        this.height = height;
        this.xvelocity = 0;
        this.yvelocity = 0;
        this.spritesheet = spritesheet;
        this.healthBar = healthBar;
        this.currentKey = 'S';
        this.healthLeft = 64;

        this.walkAnimationUp = new Animation(this.spritesheet, 0, 0, 64, 64, 0.15, 9, true, false);
        this.walkAnimationDown = new Animation(this.spritesheet, 0, 128, 64, 64, 0.15, 9, true, false);
        this.walkAnimationLeft = new Animation(this.spritesheet, 0, 64, 64, 64, 0.15, 9, true, false);
        this.walkAnimationRight = new Animation(this.spritesheet, 0, 192, 64, 64, 0.15, 9, true, false);
    }

    draw() {
        if(this.currentKey === 'W' || this.currentKey === 'w') {
            if(this.yvelocity === 0) {
                this.ctx.drawImage(this.spritesheet, 0, 0, 64, 64, this.x, this.y, 64, 64);
            } else {
                this.walkAnimationUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        } else if(this.currentKey === 'A' || this.currentKey === 'a') {
            if(this.xvelocity === 0) {
                this.ctx.drawImage(this.spritesheet, 0, 64, 64, 64, this.x, this.y, 64, 64);
            } else {
                this.walkAnimationLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        } else if(this.currentKey === 'S' || this.currentKey === 's' || this.currentKey === '' || this.currentKey === undefined) {
            if(this.yvelocity === 0) {
                this.ctx.drawImage(this.spritesheet, 0, 128, 64, 64, this.x, this.y, 64, 64);
            } else {
                this.walkAnimationDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        } else {
            if(this.xvelocity === 0) {
                this.ctx.drawImage(this.spritesheet, 0, 192, 64, 64, this.x, this.y, 64, 64);
            } else {
                this.walkAnimationRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        }
        this.ctx.drawImage(this.healthBar, 0, 0, this.healthLeft, 5, this.x, this.y, this.healthLeft, 5);
        this.updateHealthBar(0.5);
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

    updateHealthBar(value) {
        this.healthLeft = this.healthLeft - value;
        if(this.healthLeft < 1) {
            this.healthLeft = 64;
        }
    }
}
