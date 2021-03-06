class Player {
    constructor(game, x, y, width, height, spritesheet, healthBar, mainCharDead, mainCharAttack, grid, tower, world, inventory, rock, wood) {
        this.x = x;
        this.y = y;
        this.ctx = game.ctx;
        this.game = game;
        this.width = width;
        this.height = height;
        this.xvelocity = 0;
        this.yvelocity = 0;
        this.spritesheet = spritesheet;
        this.healthBar = healthBar;
        this.additionalKey = undefined;
        this.currentKey = 'S';
        this.healthLeft = 64;
        this.mainCharDead = mainCharDead;
        this.mainCharAttack = mainCharAttack;
        this.attacking = false;

        this.prevPos = {x:0, y:0};

        this.boundingBox = new BoundingBox(this.x + 22, this.y + 34, 20, 21);
        this.towerPlacementBox = new BoundingBox(this.x, this.y, this.width, this.height);

        this.grid = grid;
        this.tower = tower;
        this.world = world;

        this.inventory = inventory;
        this.rock = rock;
        this.wood = wood;

        this.walkAnimationUp = new Animation(this.spritesheet, 0, 0, 64, 64, 0.15, 9, true, false);
        this.walkAnimationDown = new Animation(this.spritesheet, 0, 128, 64, 64, 0.15, 9, true, false);
        this.walkAnimationLeft = new Animation(this.spritesheet, 0, 64, 64, 64, 0.15, 9, true, false);
        this.walkAnimationRight = new Animation(this.spritesheet, 0, 192, 64, 64, 0.15, 9, true, false);

        this.deathAnimation = new Animation(this.mainCharDead, 0, 0, 64, 64, 0.15, 6, true, false);

        this.attackAnimationUp = new Animation(this.mainCharAttack, 0, 0, 64, 64, 0.09, 8, true, false);
        this.attackAnimationDown = new Animation(this.mainCharAttack, 0, 128, 64, 64, 0.09, 8, true, false);
        this.attackAnimationLeft = new Animation(this.mainCharAttack, 0, 64, 64, 64, 0.09, 8, true, false);
        this.attackAnimationRight = new Animation(this.mainCharAttack, 0, 192, 64, 64, 0.09, 8, true, false);

        // DEBUG
        this.drawBoundingBox = true;
    }

    draw() {
        if (this.drawBoundingBox) {
            this.ctx.rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
            this.ctx.rect(this.towerPlacementBox.x, this.towerPlacementBox.y, this.towerPlacementBox.width, this.towerPlacementBox.height);
            this.ctx.stroke();
        }
        this.ctx.drawImage(this.healthBar, 0, 0, this.healthLeft, 5, this.x, this.y, this.healthLeft, 5);
        if(this.attacking) {
            if(this.currentKey === 'W' || this.currentKey === 'w') {
                this.attackAnimationUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            } else if(this.currentKey === 'A' || this.currentKey === 'a') {
                this.attackAnimationLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            } else if(this.currentKey === 'S' || this.currentKey === 's' || this.currentKey === '' || this.currentKey === undefined) {
                this.attackAnimationDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            } else {
                this.attackAnimationRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
            }
        } else {
            if(this.currentKey === 'W' || this.currentKey === 'w') {
                if(this.yvelocity === 0) {
                    this.ctx.drawImage(this.spritesheet, 0, 0, 64, 64, this.x, this.y, 64, 64);
                } else {
                    this.walkAnimationUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
                }
            } else if(this.currentKey === 'A' || this.currentKey === 'a') {
                if(this.xvelocity === 0) {
                    this.ctx.drawImage(this.spritesheet, 0, 64, 64, 64, this.x, this.y, 64, 64);
                } else {
                    this.walkAnimationLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
                }
            } else if(this.currentKey === 'S' || this.currentKey === 's' || this.currentKey === '' || this.currentKey === undefined) {
                if(this.yvelocity === 0) {
                    this.ctx.drawImage(this.spritesheet, 0, 128, 64, 64, this.x, this.y, 64, 64);
                } else {
                    this.walkAnimationDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
                }
            } else {
                if(this.xvelocity === 0) {
                    this.ctx.drawImage(this.spritesheet, 0, 192, 64, 64, this.x, this.y, 64, 64);
                } else {
                    this.walkAnimationRight.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 1);
                }
            }
        }
    }

    update() {
        this.checkCollisions();
        this.prevPos.x = this.x;
        this.prevPos.y = this.y;
        this.x += this.xvelocity;
        this.y += this.yvelocity;
        if (this.x + this.width < 0) {
            this.x = this.ctx.canvas.width;
        }
        if (this.y + this.height < 0) {
            this.y = this.ctx.canvas.height;
        }
        if (this.x - this.width > this.ctx.canvas.width) {
            this.x = -this.width;
        }
        if (this.y > this.ctx.canvas.height) {
            this.y = -this.height;
        }
        this.boundingBox.update(this.x + 22, this.y + 34);
    }

    checkCollisions() {
        for (let i = 0; i < this.game.resourceEntities.length; i++) {
            let otherEntity = this.game.resourceEntities[i];
            if (this.collide(otherEntity)) {
                this.handleCollision();
            }
        }

        for (let i = 0; i < this.game.defenseEntities.length; i++) {
            let otherEntity = this.game.defenseEntities[i];
            if (this.collide(otherEntity)) {
                this.handleCollision();
            }
        }

        for (let i = 0; i < this.game.mainEntities.length; i++) {
            let otherEntity = this.game.mainEntities[i];
            if (otherEntity !== this && this.collide(otherEntity)) {
                this.handleCollision();
            }
        }


        for(let i = 0; i < this.game.enemyEntities.length; i++) {
            let tempEntity = this.game.enemyEntities[i];
            if(tempEntity.removeMe()) {
                tempEntity.removeFromWorld = true;
            }
            if (this.collide(tempEntity) && this.attacking) {
                tempEntity.takeDamage(2.3);
                if(tempEntity.removeMe()) {
                    tempEntity.removeFromWorld = true;
                }
            }
        }
    }

    handleCollision() {
        this.x = this.prevPos.x;
        this.y = this.prevPos.y;
    }

    updateXVelocity(velocityChange) {
        this.xvelocity = velocityChange;
    }

    updateYVelocity(velocityChange) {
        this.yvelocity = velocityChange;
    }

    updateCurrentKey(key) {
        this.currentKey = key;
    }

    takeDamage(value) {
        this.healthLeft = this.healthLeft - value;
        if(this.gameOver()) {
            this.game.gameOver = true;
        }
    }

    gameOver() {
        return this.healthLeft <= 0;
    }

    updateAttackStatus() {
        this.attacking = !this.attacking;
    }

    collide(otherEntity) {
        return (this.boundingBox.left <= otherEntity.boundingBox.right && this.boundingBox.right >= otherEntity.boundingBox.left
                && this.boundingBox.top <= otherEntity.boundingBox.bottom && this.boundingBox.bottom >= otherEntity.boundingBox.top);
    }

    checkHarvestResources() {
        for (let i = 0; i < this.game.resourceEntities.length; i++) {
            if (this.inResourceRange(this.game.resourceEntities[i])) {
                this.game.resourceEntities[i].removeFromWorld = true;
                if(this.game.resourceEntities[i].type === 'tree') {
                    this.inventory.addWood();
                } else if(this.game.resourceEntities[i].type === 'rock') {
                    this.inventory.addRock();
                }
                this.displayInventory();
                console.log("remove");
            }
        }
    }

    inResourceRange(otherEntity) {
        return (this.boundingBox.left <= otherEntity.harvestBox.right && this.boundingBox.right >= otherEntity.harvestBox.left
                && this.boundingBox.top <= otherEntity.harvestBox.bottom && this.boundingBox.bottom >= otherEntity.harvestBox.top);
    }

    inPlayerRange(otherEntity) {
        return (this.towerPlacementBox.left <= otherEntity.boundingBox.right && this.towerPlacementBox.right >= otherEntity.boundingBox.left
            && this.towerPlacementBox.top <= otherEntity.boundingBox.bottom && this.towerPlacementBox.bottom >= otherEntity.boundingBox.top);
    }

    placeTower(x, y) {
        if(this.world.resources[x][y] !== 1 && this.world.resources[x][y] !== 2 && this.world.resources[x][y] !== 3 && this.noTowersNearby(x - 1, y - 1) &&
            this.inventory.getWoodCount() > 0 && this.inventory.getRockCount() > 0 && !this.game.spawn) {

            var newTower = new Tower(this.game, (x - 1) * 40, (y - 1) * 40, 80, 80, this.tower);
            console.log(newTower);
            console.log(this.towerPlacementBox);
            if(!this.inPlayerRange(newTower)) {
                this.inventory.removeWood();
                this.inventory.removeRock();
                this.world.resources[x - 1][y - 1] = 4;
    
                this.game.addDefenseEntity(newTower);
            }
            this.displayInventory();
        }
    }

    displayInventory() {
        var rockDisplay = this.rock.innerHTML.split(' ');
        var woodDisplay = this.wood.innerHTML.split(' ');

        this.rock.innerHTML = rockDisplay[0] + ' ' + this.inventory.getRockCount();
        this.wood.innerHTML = woodDisplay[0] + ' ' + this.inventory.getWoodCount();
    }

    noTowersNearby(x, y) {
        return this.world.resources[x][y] !== 4 && this.world.resources[x][y - 1] !== 4 && this.world.resources[x + 1][y - 1] !== 4 &&
                this.world.resources[x + 1][y] !== 4 && this.world.resources[x + 1][y + 1] !== 4 && this.world.resources[x][y + 1] !== 4 &&
                this.world.resources[x - 1][y + 1] !== 4 && this.world.resources[x - 1][y] !== 4 && this.world.resources[x - 1][y + 1] !== 4
    }
}
