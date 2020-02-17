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
        this.trees = [];
        this.rockWidth = 31;
        this.rockHeight = 25;
        this.treeWidth = 43;
        this.treeHeight = 50;
    }

    generate() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.worldTiles[this.rows*i + j] = this.loadedTiles[0];
            }
        }

        let lastTree = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                let rand = Math.random() * 10;
                if (rand < 1 && lastTree > 8) {
                    // Place a tree
                    this.trees[i*this.rows + j] = 1;
                    lastTree = 0;
                } else {
                    this.trees[i*this.rows + j] = 0;
                    lastTree++;
                }
            }
        }
        this.initResources();
    }

    initResources() {
        for (var j = 0; j < this.rows; j++) {
            for (var i = 0; i < this.columns; i++) {
                // If a resource should be placed...
                if (this.trees[i*this.rows + j] === 1) {
                    let xPos = (i-1)*this.tileDim + (this.tileDim / 2);
                    let yPos = (j-1)*this.tileDim + (this.tileDim / 2);
                    let width = 43;
                    let height = 50;

                    let randomNum = Math.random() * 2;
                    if (randomNum < 1) {
                        this.game.addResourceEntity(new Resource(xPos, yPos, this.rockWidth, this.rockHeight, this.game, this.rockSprite));
                    } else {
                        this.game.addResourceEntity(new Resource(xPos, yPos, this.treeWidth, this.treeHeight, this.game, this.treeSprite));
                    }

                }
            }
        }
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
