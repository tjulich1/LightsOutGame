class Resource {
    constructor(x, y, width, height, game, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.game = game;
        this.ctx = game.ctx;
        this.image = image;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    update() {}
}
