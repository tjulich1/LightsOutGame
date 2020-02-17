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
        let lastResource = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                let shouldPlace = Math.random() * 2
                if (lastResource >= 10 && shouldPlace > 1) {
                    let resourceType = Math.random() * 2;
                    if (resourceType < 1) {
                        // Place a tree
                        this.resources[j][i] = 1;
                        this.game.addResourceEntity(new Resource(j*this.tileDim, i*this.tileDim, this.treeWidth, this.treeHeight, this.game, this.treeSprite));
                    } else {
                        // Place a rock
                        this.resources[j][i] = 2;
                        this.game.addResourceEntity(new Resource(j*this.tileDim, i*this.tileDim, this.rockWidth, this.rockHeight, this.game, this.rockSprite));
                    }
                    lastResource = 0;
                } else {
                    lastResource++;
                }
            }
        }
    }
    
    checkSurroundingResources(x, y) {

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
