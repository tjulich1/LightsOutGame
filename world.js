/**
*   Trent Julich
*   25 January 2020
**/

class World {
    constructor(tileSheet, loadedTiles, desiredTileDim, numRows, numColumns, gameEngine) {
        this.tileSheet = tileSheet;
        this.loadedTiles = loadedTiles;
        this.tileDim = desiredTileDim;
        this.rows = numRows;
        this.columns = numColumns;
        this.game = gameEngine;
        this.ctx = gameEngine.ctx;
        this.worldTiles = [];
    }

    generate() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.worldTiles[this.rows*i + j] = this.loadedTiles[0];
            }
        }
        this.worldTiles[0] = this.loadedTiles[1];
        this.worldTiles[1] = this.loadedTiles[2];
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

    update() {

    }
}
