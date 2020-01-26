class Skeleton extends Enemy{
    constructor(game, x, y, width, height){
        //filler numbers for health, xvelo, and yvelo.
        //may need to pass in coordinates of the light or implement 
        //a way for it to be found on the game board.
        super(game, x, y,width, height, 100, 0, 0);
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fill(); 
    }

    //currently the exact same as armored, but i expect this to change as the code
    //evolves.
    //Need to implement a way to search the board for enitites.
    update(){
        this.getVelocity();
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

    //got to the center of the map, but needs to be updated to search.
    getVelocity(){
        var xCenter = this.ctx.canvas.width/2;
        var yCenter = this.ctx.canvas.height/2;
        var xDist = Math.abs((xCenter + 25) - (this.x + this.width/2));
        var yDist = Math.abs((yCenter + 25) - (this.y + this.height/2));
        //var dist = Math.sqrt(xDist**2 + yDist**2);
            if(yCenter - this.y < 0 && yDist > xDist){
                this.yVelocity = -2;
                this.xVelocity = 0;
                
            }else if(yCenter - this.y > 0 && yDist > xDist){
                this.yVelocity = 2;
                this.xVelocity = 0;

            }else if(xCenter - this.x < 0){
                this.xVelocity = -2;
                this.yVelocity = 0;

            }else if(xCenter - this.x > 0){
                this.xVelocity = 2;
                this.yVelocity = 0;
            }

            if(xDist < 50 && yDist < 50){
                this.xVelocity = 0;
                this.yVelocity = 0;
            }

    }

}