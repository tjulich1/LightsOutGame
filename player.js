class Player {
    constructor(game, x, y, width, height, spritesheet, healthBar, mainCharDead, mainCharAttack) {
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
        this.prevKey = 'undefined';
        this.healthLeft = 64;
        this.mainCharDead = mainCharDead;
        this.mainCharAttack = mainCharAttack;
        this.attacking = false;
        this.boundingBox = new BoundingBox(this.x + 17, this.y + 8.5, 30, 47);

        this.walkAnimationUp = new Animation(this.spritesheet, 0, 0, 64, 64, 0.15, 9, true, false);
        this.walkAnimationDown = new Animation(this.spritesheet, 0, 128, 64, 64, 0.15, 9, true, false);
        this.walkAnimationLeft = new Animation(this.spritesheet, 0, 64, 64, 64, 0.15, 9, true, false);
        this.walkAnimationRight = new Animation(this.spritesheet, 0, 192, 64, 64, 0.15, 9, true, false);

        this.deathAnimation = new Animation(this.mainCharDead, 0, 0, 64, 64, 0.15, 6, true, false);

        this.attackAnimationUp = new Animation(this.mainCharAttack, 0, 0, 64, 64, 0.15, 8, true, false);
        this.attackAnimationDown = new Animation(this.mainCharAttack, 0, 128, 64, 64, 0.15, 8, true, false);
        this.attackAnimationLeft = new Animation(this.mainCharAttack, 0, 64, 64, 64, 0.15, 8, true, false);
        this.attackAnimationRight = new Animation(this.mainCharAttack, 0, 192, 64, 64, 0.15, 8, true, false);
    }

    draw() {
        this.ctx.drawImage(this.healthBar, 0, 0, this.healthLeft, 5, this.x, this.y, this.healthLeft, 5);
        this.updateHealthBar(0.3);
        if(this.attacking) {
            if(this.currentKey === 'W' || this.currentKey === 'w') {
                this.attackAnimationUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            } else if(this.currentKey === 'A' || this.currentKey === 'a') {
                this.attackAnimationLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            } else if(this.currentKey === 'S' || this.currentKey === 's' || this.currentKey === '' || this.currentKey === undefined) {
                this.attackAnimationDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            } else {
                this.attackAnimationRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        } else {
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
        this.boundingBox.update(this.x + 17, this.y + 8.5);
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

    updatePreviousKey(key) {
        this.prevKey = key;
    }

    updateHealthBar(value) {
        this.healthLeft = this.healthLeft - value;
        if(this.healthLeft <= 0) {
            this.healthLeft = 64;
        }
    }

    updateAttackStatus() {
        this.attacking = !this.attacking;
    }
}
