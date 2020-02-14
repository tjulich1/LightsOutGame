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
        this.slope = this.getSlope();
        this.xVelocity = this.getXVelocity();
        if(this.slope === 0){
            this.yVelocity = this.getYVelocity();
        }
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.x, this.y,);
    }

    update(){
        if(this.slope !== 0){
            this.x += this.xVelocity;
            this.y += this.slope * this.xVelocity;
        }else{
            this.x += this.xVelocity;
            this.y += this.yVelocity;
        }
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

    getSlope(){
        // console.log("Tx " + this.targetPoint.x);
        // console.log("Ty " + this.targetPoint.y);
        var dX = this.targetPoint.x - this.x;
        var dY = this.targetPoint.y - this.y;
        // console.log("Dx " + dX);
        // console.log("Dy " + dY);

        if(dX !== 0){
            //console.log("Slope: " + dY/dX);
            return dY/dX;
        }else{
            return 0;
        }
    }
}