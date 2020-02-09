class Skeleton extends Enemy{
    constructor(game, x, y, width, height, walkSpriteSheet){
        //filler numbers for health, xvelo, and yvelo.
        //may need to pass in coordinates of the light or implement 
        //a way for it to be found on the game board.
        super(game, x, y,width, height, 100, 0, 0, walkSpriteSheet);
    }

    

    //currently the exact same as armored, but i expect this to change as the code
    //evolves.
    //Need to implement a way to search the board for enitites.
    update(){
        if(this.changeDirectionThresh === 0){
            this.getVelocity();
            this.changeDirectionThresh = 30;
        }else{
            this.changeDirectionThresh--;
        }
        this.x += this.xVelocity;
        this.y += this.yVelocity;

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

    //update this to be more smooth.
    getVelocity(){
        var xCenter = this.ctx.canvas.width/2;
        var yCenter = this.ctx.canvas.height/2;
        var xDist = Math.abs((xCenter + 25) - (this.x + this.width/2));
        var yDist = Math.abs((yCenter + 25) - (this.y + this.height/2));

            if(yCenter - this.y < 0 && yDist > xDist){
                this.yVelocity = -2;
                this.xVelocity = 0;
                this.direction = 0;

                
            }else if(yCenter - this.y > 0 && yDist > xDist){
                this.yVelocity = 2;
                this.xVelocity = 0;
                this.direction = 2;

            }else if(xCenter - this.x < 0){
                this.xVelocity = -2;
                this.yVelocity = 0;
                this.direction = 1;

            }else if(xCenter - this.x > 0){
                this.xVelocity = 2;
                this.yVelocity = 0;
                this.direction = 3;
            }

            if(xDist < 50 && yDist < 50){
                this.xVelocity = 0;
                this.yVelocity = 0;
            }

    }

}