class Enemy {
    constructor(game, x, y, width, height, health, xVelocity, yVelocity, spriteWalk, spriteAttack, spriteDie){
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
                        new Animation(spriteAttack, 0, 0, 64, 64,.30, 6, true, false),
                        new Animation(spriteAttack, 0, 64, 64, 64, .30, 6, true, false),
                        new Animation(spriteAttack, 0, 128, 64, 64, .30, 6, true, false),
                        new Animation(spriteAttack, 0, 192, 64, 64, .30, 6, true, false),
                        new Animation(spriteDie, 0, 0, 64, 64, .10, 6, false, false)];
        this.changeDirectionThresh = 0;
        this.attackThresh = 0;
        this.attack = false;
        this.dead = false;
        this.boundingBox = new BoundingBox(this.x + 17, this.y + 14, 30, 48);
        this.target = null;
        this.health = health
        this.remove = false;
    }

    //may need to figure out a way to pause animation after attack.
    draw(){
        if(this.attack && !this.dead){
            this.animations[this.direction + 4].drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }else if( this.dead){
            this.animations[8].drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
            if(this.animations[8].isDone()){
                this.remove = true;
            }
        }else{
            this.animations[this.direction].drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
        }
    }

    collide(other){
        return (this.boundingBox.left <= other.boundingBox.right && this.boundingBox.right >= other.boundingBox.left
                && this.boundingBox.top <= other.boundingBox.bottom && this.boundingBox.bottom >= other.boundingBox.top);
    }

    getVelocity(){
        var xDist = Math.abs(this.x - this.target.x);
        var yDist = Math.abs(this.y - this.target.y);

        if(xDist >= yDist){
            //get xVelocity;
            if(this.target.x - this.x < 0){
                if(this.xVelocity >= 0){
                    this.xVelocity *= -1;
                    this.yVelocity = 0;
                }
                if(this.xVelocity === 0){
                    this.xVelocity = -2;
                    this.yVelocity = 0;
                }
                this.direction = 1;

            }else if(this.target.x - this.x > 0){
                if(this.xVelocity < 0){
                    this.xVelocity *= -1;
                    this.yVelocity = 0;
                }
                if(this.xVelocity === 0){
                    this.xVelocity = 2;
                    this.yVelocity = 0;
                }
                this.direction = 3;
            }
        }else{
             //get yVelocity
            if(this.target.y - this.y < 0){
                if(this.yVelocity >= 0){
                    this.yVelocity *= -1;
                    this.xVelocity = 0;
                }
                if(this.yVelocity == 0){
                    this.yVelocity = -2;
                    this.xVelocity = 0;
                }
                this.direction = 0;
            }
            if(this.target.y - this.y > 0){
                if(this.yVelocity < 0){
                    this.yVelocity *= -1;
                    this.xVelocity = 0;
                }
                if(this.yVelocity == 0){
                    this.yVelocity = 2;
                    this.xVelocity = 0;
                }
                this.direction = 2;
            }
        }
    }

    distance(other){
        return Math.sqrt((other.x + other.width/2 - this.x + this.width/2)**2 + (other.y + other.height/2 - this.y + this.height/2)**2);
    }

    changeDirection(other){
        if(this.direction === 0){
            this.yVelocity = 0;
            this.y = other.boundingBox.bottom + 1;
            if(this.x < this.target.x){
                this.direction = 3;
                this.xVelocity = 2;
            }else{
                this.direction = 1;
                this.xVelocity = -2;
            }
        }else if(this.direction === 2){
            this.yVelocity = 0;
            //problem here
            this.y -= 5;
            if(this.x < this.target.x){
                this.direction = 3;
                this.xVelocity = 2;
            }else{
                this.direction = 1;
                this.xVelocity = -2;
            }
        }else if(this.direction === 1){
            this.xVelocity = 0;
            this.x = other.boundingBox.right + 1;
            if(this.y < this.target.y){
                this.direction = 2;
                this.yVelocity = 2;
            }else{
                this.direction = 0;
                this.yVelocity = -2;
            }
        }else{
            this.xVelocity = 0;
            //problem here
            this.x -= 5;
            if(this.y < this.target.y){
                this.direction = 2;
                this.yVelocity = 2;
            }else{
                this.direction = 0;
                this.yVelocity = -2;
            }
        }
    }

    takeDamage(value) {
        this.health = this.health - value;
        if(this.health <= 0){
            this.dead = true;
        }
    }

    removeMe(){
        return this.dead && this.remove;
    }
}
