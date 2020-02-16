class Armored extends Enemy{
    constructor(game, x, y, width, height, walkSpriteSheet, attackSpriteSheet){
        
        //Possibly pass up a health value.
        super(game, x, y,width, height, 200, 0, 0, walkSpriteSheet, attackSpriteSheet);
    }

    update(){
        //if my target has dies or no longer exists set attack to false;
        if(!this.target){
            //get the main char
            this.target = this.game.mainEntities[0];
        }

        if(this.changeDirectionThresh === 0 && !this.attack){
            this.getVelocity();
            this.changeDirectionThresh = 30;
        }else if(this.attack){
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.changeDirectionThresh = 0;
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

        this.boundingBox.update(this.x + 17, this.y + 8.5);
        var ent = null;
        this.attack = false;

        //find closest target (done)
        //have I collided with target? (main char, defense, campfire)
        //if yes set attack to true 
        for(var i = 0; i < this.game.mainEntities.length; i++){
            ent = this.game.mainEntities[i];
            if(this.collide(ent) && this.target === ent){
                this.attack = true;
                //deal dmanage
            }else if(this.collide(ent)){
                this.changeDirection(ent);
                this.changeDirectionThresh = 60;
            }
        }

        for(var i = 0; i < this.game.defenseEntities.length; i++){
            ent = this.game.defenseEntities[i];
            if(this.collide(ent) && !this.attack){
                this.changeDirection(ent);
                this.changeDirectionThresh = 60;
            }
        }

        // see if this has collided with resources or other enemies
        for(var i = 0; i < this.game.resourceEntities.length; i++){
            //get around
        }

        for(var i = 0; i < this.game.enemyEntities.length; i++){
            ent = this.game.enemyEntities[i];
            if(this !== ent && this.collide(ent) && (this.xVelocity !== 0 || this.yVelocity !== 0)){
                this.changeDirection(ent);
                this.changeDirectionThresh = 60;
            }
        }
    }
}