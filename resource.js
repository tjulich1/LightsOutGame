/**
* Trent Julich
* 27 January 2020
**/

class Resource {
    constructor(x, y, width, height, game, image) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.game = game;
        this.ctx = game.ctx;
        this.image = image;

        let gatherThreshold = 10;
        this.harvestBox = new BoundingBox(this.x-gatherThreshold, this.y-gatherThreshold,
                                        this.width + 2*gatherThreshold, this.height + 2*gatherThreshold);
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // this.ctx.rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        // this.ctx.stroke();

        this.ctx.rect(this.harvestBox.x, this.harvestBox.y, this.harvestBox.width, this.harvestBox.height);
        this.ctx.stroke();


    }

    update() {}
}
