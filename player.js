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

        this.walkAnimationUp = new Animation(spritesheet, 0, 0, 64, 64, 0.15, 9, true, false);
        this.walkAnimationDown = new Animation(spritesheet, 0, 128, 64, 64, 0.15, 9, true, false);
        this.walkAnimationLeft = new Animation(spritesheet, 0, 64, 64, 64, 0.15, 9, true, false);
        this.walkAnimationRight = new Animation(spritesheet, 0, 192, 64, 64, 0.15, 9, true, false);
    }

    draw() {
        if(this.currentKey === 'W' || this.currentKey === 'w') {
            // this.ctx.drawImage(this.spritesheet, 0, 0, 
            //     this.width, this.height, this.x, this.y, 
            //     this.width, this.height);
            this.walkAnimationUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        } else if(this.currentKey === 'A' || this.currentKey === 'a') {
            // this.ctx.drawImage(this.spritesheet, 0, 1 * this.height, 
            //     this.width, this.height, this.x, this.y, 
            //     this.width, this.height);
            this.walkAnimationLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        } else if(this.currentKey === 'S' || this.currentKey === 's' || this.currentKey === '' || this.currentKey === undefined) {
            // this.ctx.drawImage(this.spritesheet, 0, 2 * this.height, 
            //     this.width, this.height, this.x, this.y, 
            //     this.width, this.height);
            this.walkAnimationDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        } else {
            // this.ctx.drawImage(this.spritesheet, 0, 3 * this.height, 
            //     this.width, this.height, this.x, this.y, 
            //     this.width, this.height);
            this.walkAnimationRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);

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
