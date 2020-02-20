/**
*   Trent Julich
*   25 January 2020
**/

class World {
    constructor(tileSheet, loadedTiles, desiredTileDim, numRows, numColumns, gameEngine, treeSprite, rockSprite) {
        this.tileSheet = tileSheet;
        this.treeSprite = treeSprite;
        this.rockSprite = rockSprite;
        this.loadedTiles = loadedTiles;
        this.tileDim = desiredTileDim;
        this.rows = numRows;
        this.columns = numColumns;
        this.game = gameEngine;
        this.ctx = gameEngine.ctx;
        this.worldTiles = [];
        this.resources = [];
        this.rockWidth = 31;
        this.rockHeight = 25;
        this.treeWidth = 43;
        this.treeHeight = 50;
    }

    generate() {
        this.initBackgroundTiles();
        this.initResources();
    }

    initBackgroundTiles() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                // Initialize the background tiles with the desired loaded tile.
                this.worldTiles[this.rows*i + j] = this.loadedTiles[0];
            }
        }
    }

    initResources() {
        for (var i = 0; i < this.rows; i++) {
            this.resources[i] = new Array(this.columns).fill(0);
        }
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                let shouldPlace = Math.random() * 2
                if (this.checkSurroundingResources(j, i) && shouldPlace > 1) {
                    let resourceType = Math.random() * 2;
                    if (resourceType < 1) {
                        // Place a tree
                        this.resources[j][i] = 1;
                        this.game.addResourceEntity(new Resource(j*this.tileDim, i*this.tileDim, this.treeWidth, this.treeHeight, this.game, this.treeSprite, 'tree'));
                    } else {
                        // Place a rock
                        this.resources[j][i] = 2;
                        this.game.addResourceEntity(new Resource(j*this.tileDim, i*this.tileDim, this.rockWidth, this.rockHeight, this.game, this.rockSprite, 'rock'));
                    }
                }
            }
        }

        this.resources[9][10] = 3;
        this.resources[10][10] = 3;
    }
    
    checkSurroundingResources(x, y) {
        for (let currentRow = x - 3; currentRow <= x + 3; currentRow++) {
            for (let currentColumn = y - 3; currentColumn <= y + 3; currentColumn++) {
                if (currentRow >= 0 && currentColumn >= 0 && currentRow < this.rows && currentColumn < this.columns) {
                    console.log(currentRow);
                    if (this.resources[currentRow][currentColumn] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    draw() {
        var x = 0;
        var y = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var currentTile = this.worldTiles[this.rows*i + j];
                this.ctx.drawImage(this.tileSheet, currentTile.x, currentTile.y, currentTile.tileWidth, currentTile.tileHeight, x, y, this.tileDim, this.tileDim);
                x += this.tileDim;
            }
            x = 0;
            y += this.tileDim;
        }
    }

    update() {}
}
