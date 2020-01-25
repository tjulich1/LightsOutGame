function Enemy(health, target){
    this.health = health;
    this.target = target;
}

Enemy.prototype.findTarget = function() {
    //search for this.target
}

Enemy.prototype.takeDamage = function(damageTaken) {
    //when damage is taken
    //this.health -= damageTaken; 
}

Enemy.prototype.isDead = function(){
    //determine if the enemy is dead
    //return this.health <= 0;
}

//maybe an animation function?