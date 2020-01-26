class PlayerMovementHandler {
    constructor() {
        this.ctx = undefined;
        this.game = undefined;
        this.player = undefined;
        var movementKeys = [];
        movementKeys['a'] = 0;
        movementKeys['s'] = 0;
        movementKeys['d'] = 0;
        movementKeys['w'] = 0;
        this.movementKeys = movementKeys;
        this.currentKey = 2;
    }

    keyDown(key){
        switch (key) {
            case 'A':
                this.movementKeys['a'] = 1;
                this.currentKey = 1
                break;
            case 'S':
                this.movementKeys['s'] = 1;
                this.currentKey = 2
                break;
            case 'D':
                this.movementKeys['d'] = 1;
                this.currentKey = 3
                break;
            case 'W':
                this.movementKeys['w'] = 1;
                this.currentKey = 0;
                break;
            default:
                break;
        }
        this.player.updateXVelocity(this.movementKeys['a']*(-1)*10+this.movementKeys['d']*10);
        this.player.updateYVelocity(this.movementKeys['s']*10+this.movementKeys['w']*10*(-1));
    }

    keyUp(key) {
        switch (key) {
            case 'A':
                this.movementKeys['a'] = 0;
                break;
            case 'S':
                this.movementKeys['s'] = 0;
                break;
            case 'D':
                this.movementKeys['d'] = 0;
                break;
            case 'W':
                this.movementKeys['w'] = 0;
                break;
            default:
                break;
        }
        this.player.updateXVelocity(this.movementKeys['a']*(-1)*10+this.movementKeys['d']*10);
        this.player.updateYVelocity(this.movementKeys['s']*10+this.movementKeys['w']*10*(-1));
    }

    assignPlayer(player) {
        this.player = player;
    }

    setContext(game) {
        this.game = game;
        this.ctx = game.ctx;
    }

    drawCurrentImage(key) {
        this.player.draw(key);
    }
}
