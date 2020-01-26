/**
*   Trent Julich
*   25 January 2020
**/

class TileLoader {
    constructor() {
        this.tileSheet = undefined;
        this.tileWidth = 0;
        this.tileHeight = 0;
        this.rows = 0;
        this.columns = 0;
        this.loadedTiles = [];
    }

    loadTileSheet(tileSheet, tileWidth, tileHeight, rows, columns) {
        var tileCount = 0;
        this.tileSheet = tileSheet;
        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < columns; i++) {
                this.loadedTiles[tileCount] = new Tile(tileWidth*i, tileHeight*j, tileWidth, tileHeight);
                tileCount++;
            }
        }
    }
}

class Tile {
    constructor(x, y, tileWidth, tileHeight) {
        this.x = x;
        this.y = y;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
}
