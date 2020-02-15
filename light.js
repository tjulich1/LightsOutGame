class Light{
    constructor(game, width, height, spritesheet){
        this.ctx = game.ctx;
        this.animation = new Animation(spritesheet, 0, 0, 64, 64, .20, 5, true, false);
        this.game = game;
        this.height = height;
        this.width = width;
        //this.health = 100;

        //put the light in the middle of the tileset.
        //We could also accept x, y anad place it at different coordinates.
        this.x = this.ctx.canvas.width/2 - this.width/2;
        this.y = this.ctx.canvas.height/2 - this.height/2;
        this.boundingBox = new BoundingBox(this.x + 17, this.y + 32, 30, 32); 
    }

    draw(){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
    }

    update(){
        
    }

    // increase health to full or by some %
    repair(){

    }

    //Increase max health of the light, radius, ect
    levelUp(){

    }

    //When light has not life game is over.
    gameOver(){
        return this.health <= 0;
    }
}