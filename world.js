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
        console.log(loadedTiles.length);
    }

    draw() {
        var x = 10;
        var y = 10;
        for (var i = 0; i < this.loadedTiles.length; i++) {
            var currentTile = this.loadedTiles[i];
            this.ctx.drawImage(this.tileSheet, currentTile.x, currentTile.y, currentTile.tileWidth, currentTile.tileHeight, x, y, this.tileDim, this.tileDim);
            x += this.tileDim;
            y += this.tileDim;
        }
    }

    update() {

    }
}
