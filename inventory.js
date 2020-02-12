class Inventory {
    constructor() {
        this.wood = 0;
        this.rock = 0;
    }

    addWood() {
        this.wood += 1;
    }

    removeWood() {
        if(this.wood > 0) {
            this.wood -= 1;
        }
    }

    getWoodCount() {
        return this.wood;
    }

    addRock() {
        this.rock += 1;
    }

    removeRock() {
        if(this.rock > 0) {
            this.rock -= 1;
        }
    }

    getRockCount() {
        return this.rock;
    }
}