class Skeleton extends Enemy{
    constructor(game, x, y, width, height, walkSpriteSheet, attackSpriteSheet){
        //filler numbers for health, xvelo, and yvelo.
        //may need to pass in coordinates of the light or implement 
        //a way for it to be found on the game board.
        super(game, x, y,width, height, 100, 0, 0, walkSpriteSheet, attackSpriteSheet);
    }

    update(){
        //if my target has dies or no longer exists set attack to false;
        if(!this.target){
            this.attack = false;
        }

        if(this.changeDirectionThresh === 0 && !this.attack){
            this.findClosestTarget();
            this.getVelocity();
            this.changeDirectionThresh = 30;
        }else if(this.attack){
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.changeDirectionThresh = 0;
            //may need to get proper direction to face
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
            if(this.collide(ent)){
                this.attack = true;
                if(this.target !== ent){
                    this.target = ent;
                }
            }
        }

        for(var i = 0; i < this.game.defenseEntities.length; i++){
            ent = this.game.defenseEntities[i];
            if(this.collide(ent) && !this.attack){
                this.attack = true;
                this.target = ent;
            }
        }

        // see if this has collided with resources or other enemies
        for(var i = 0; i < this.game.resourceEntities.length; i++){
            //get away
        }

        for(var i = 0; i < this.game.enemyEntities.length; i++){
            ent = this.game.enemyEntities[i];
            if(this !== ent && this.collide(ent) && (this.xVelocity !== 0 || this.yVelocity !== 0)){
                this.changeDirection(ent);
            }
        }
    }


    
    findClosestTarget(){
        var minDist = Infinity;
        var currDist = 0;
        var ent = null;
        console.log("lookingent");

        for(var i = 0; i < this.game.mainEntities.length; i++){
            ent = this.game.mainEntities[i];
            currDist = this.distance(ent);
            console.log(ent.x);

            if(currDist < minDist){
                console.log("found ent");
                minDist = currDist;
                this.target = ent;
            }
        }

        for(var i = 0; i < this.game.defenseEntities.length; i++){
            ent = this.game.mainEntities[i];
            currDist = this.distance(ent);

            if(currDist < minDist){
                minDist = currDist;
                this.target = ent;
            }
        }
    }
}