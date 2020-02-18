class Grid {

    constructor(rows, columns, totalWidth, totalHeight, game) {
        this.rows = rows;
        this.columns = columns;
        this.totalWidth = totalWidth;
        this.totalHeight = totalHeight;
        this.rowHeight = totalHeight / rows;
        this.columnWidth = totalWidth / columns;
        this.game = game;
        this.ctx = game.ctx;
        this.highlightRow = -1;
        this.highlightColumn = -1;
        this.gridOn = false;
    }

    draw() {

        if (this.gridOn) {
            for (let i = 0; i < this.columns; i++) {
                this.ctx.strokeStyle = 'blue';
                this.ctx.beginPath();
                this.ctx.moveTo(i*this.columnWidth, 0);
                this.ctx.lineTo(i*this.columnWidth, this.totalHeight);
                this.ctx.stroke();
            }

            for (let i = 0; i < this.rows; i++) {
                this.ctx.strokeStyle = 'blue';
                this.ctx.beginPath();
                this.ctx.moveTo(0, i*this.rowHeight);
                this.ctx.lineTo(this.totalWidth, i*this.rowHeight);
                this.ctx.stroke();
            }
        }

        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.fillRect(this.highlightRow*this.rowHeight,
                        this.highlightColumn*this.columnWidth,
                        this.columnWidth,
                        this.rowHeight);
        this.ctx.stroke();
    }

    updateHighlightCells(row, column) {
        this.highlightRow = Math.floor(row/this.rowHeight);
        this.highlightColumn = Math.floor(column/this.columnWidth);
        // console.log(`${this.highlightRow}, ${this.highlightColumn}`);
    }

    getCoordinates() {
        return {x: this.highlightRow, y: this.highlightColumn};
    }

    update() {

    }

}
