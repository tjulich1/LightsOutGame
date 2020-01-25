function Enemy(health, target){
    this.health = health;
    this.target = target;
}

Enemy.prototype.getTarget = function() {
    //perform greedy search to find target at the start of the "night"
}

Enemy.prototype.takeDamage = function() {
    //when damage is taken 
}