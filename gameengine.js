// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine() {
    this.mainEntities = [];
    this.enemyEntities = [];
    this.resourceEntities = [];
    this.defenseEntities = [];
    this.miscEntities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;

    this.movementHandler = null;
}

GameEngine.prototype.setMovementHandler = function(handler) {
    this.movementHandler = handler;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    this.ctx.canvas.addEventListener("keydown", function (e) {
        e.preventDefault();
        that.movementHandler.keyDown(String.fromCharCode(e.which));
        that.movementHandler.player.updateCurrentKey(e.key);
    }, false);

    this.ctx.canvas.addEventListener("keyup", function(e) {
        e.preventDefault();
        that.movementHandler.keyUp(String.fromCharCode(e.which));
        that.movementHandler.player.updateCurrentKey(e.key);
    }, false);

    console.log('Input started');
}

GameEngine.prototype.addMainEntity = function (entity) {
    console.log('added main entity');
    this.mainEntities.push(entity);
}

GameEngine.prototype.addEnemyEntity = function (entity) {
    console.log('added enemy entity');
    this.enemyEntities.push(entity);
}

GameEngine.prototype.addResourceEntity = function (entity) {
    console.log('added resource entity');
    this.resourceEntities.push(entity);
}

GameEngine.prototype.addDefenseEntity = function (entity) {
    console.log('added defense entity');
    this.defenseEntities.push(entity);
}

GameEngine.prototype.addMiscEntity = function (entity) {
    console.log('added misc entity');
    this.miscEntities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();

    for(var i = 0; i < this.miscEntities.length; i++){
        this.miscEntities[i].draw(this.ctx);
    }

    for (var i = 0; i < this.mainEntities.length; i++) {
        this.mainEntities[i].draw(this.ctx);
    }

    for(var i = 0; i < this.enemyEntities.length; i++){
        this.enemyEntities[i].draw(this.ctx);
    }

    for(var i = 0; i < this.resourceEntities.length; i++){
        this.resourceEntities[i].draw(this.ctx);
    }

    for(var i = 0; i < this.defenseEntities.length; i++){
        this.defenseEntities[i].draw(this.ctx);
    }


    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var mainCount = this.mainEntities.length;
    var enemyCount = this.enemyEntities.length;
    var resourceCount = this.resourceEntities.length;
    var defenseCount = this.defenseEntities.length;
    var miscCount = this.miscEntities.length;

    //Misc entities (Will we ever have to remove?)
    for (var i = 0; i < miscCount; i++) {
        var entity = this.miscEntities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    
    //Main entities (fire and main char)
    for (var i = 0; i < mainCount; i++) {
        var entity = this.mainEntities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.mainEntities.length - 1; i >= 0; --i) {
        if (this.mainEntities[i].removeFromWorld) {
            this.mainEntities.splice(i, 1);
        }
    }
    
    //Enemy entities
    for (var i = 0; i < enemyCount; i++) {
        var entity = this.enemyEntities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.enemyEntities.length - 1; i >= 0; --i) {
        if (this.enemyEntities[i].removeFromWorld) {
            this.enemyEntities.splice(i, 1);
        }
    }

    //Resource entities
    for (var i = 0; i < resourceCount; i++) {
        var entity = this.resourceEntities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.resourceEntities.length - 1; i >= 0; --i) {
        if (this.resourceEntities[i].removeFromWorld) {
            this.resourceEntities.splice(i, 1);
        }
    }

    //Defense entities
    for (var i = 0; i < defenseCount; i++) {
        var entity = this.defenseEntities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.defenseEntities.length - 1; i >= 0; --i) {
        if (this.defenseEntities[i].removeFromWorld) {
            this.defesneEntities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
