class MouseHandler {

    constructor(game, grid) {
        this.game = game;
        this.ctx = game.ctx;
        this.grid = grid;
        var that = this;
        this.ctx.canvas.addEventListener("mousemove", function(e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            that.grid.updateHighlightCells(x, y);
        });
    }
}
