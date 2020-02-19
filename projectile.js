class Projectile{
    constructor(game, x, y, width, height, targetPoint, sprite){
        this.game = game;
        this.ctx = game.ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.targetPoint = targetPoint;
        this.sprite = sprite;
        this.damage = 20;
        this.angle = this.getAngle();
        this.xVelocity = this.getXVelocity();
        this.yVelocity = this.getYVelocity();
        this.boundingBox = new BoundingBox(this.x, this.y , this.width, this.height);
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.x, this.y,);
    }

    update(){
        if(this.angle !== 0){
            this.x += this.xVelocity*(Math.cos(this.angle*Math.PI/180));
            this.y += this.yVelocity*(Math.sin(this.angle*Math.PI/180));
        }else{
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        }

        var ent = null;
        if(this.y < 0 | this.x < 0 || this.y > 800 || this.x > 800){
            for(var i = 0; i < this.game.projectileEntities.length; i++){
                ent = this.game.projectileEntities[i];
                if(this === ent){
                    ent.removeFromWorld = true;
                }
            }
        }

        this.boundingBox.update(this.x, this.y);
    }

    getXVelocity(){
        if(this.x === this.targetPoint.x){
            return 0;
        }else if(this.x < this.targetPoint.x){
            return 3;
        }else{
            return -3;
        }
    }

    getYVelocity(){
        if(this.y === this.targetPoint.y){
            return 0;
        }else if(this.y < this.targetPoint.y){
            return 3;
        }else{
            return -3;
        }
    }

    getAngle(){
        var dX = this.targetPoint.x - this.x;
        var dY = this.targetPoint.y - this.y;

        if(dX !== 0){
            if(dX < 0 && dY > 0 || dX > 0 && dY < 0){
                dY *= -1;
            }
            var theta = Math.atan(dY/dX)
            theta *= 180/Math.PI;
            if(theta < 0){
                theta += 360;
            }
            return theta;
        }else{
            return 0;
        }
    }

    getDamage(){
        return this.damage;
    }
}