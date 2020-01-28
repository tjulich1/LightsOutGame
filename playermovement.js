class PlayerMovementHandler {
    constructor(velocityScale) {
        this.ctx = undefined;
        this.game = undefined;
        this.player = undefined;
        var movementKeys = [];
        movementKeys['a'] = 0;
        movementKeys['s'] = 0;
        movementKeys['d'] = 0;
        movementKeys['w'] = 0;
        this.movementKeys = movementKeys;
        this.vs = velocityScale;
    }

    keyDown(key){
        switch (key) {
            case 'A':
                this.movementKeys['a'] = 1;
                break;
            case 'S':
                this.movementKeys['s'] = 1;
                break;
            case 'D':
                this.movementKeys['d'] = 1;
                break;
            case 'W':
                this.movementKeys['w'] = 1;
                break;
            default:
                break;
        }
        this.player.updateXVelocity(this.movementKeys['a']*(-1)*this.vs+this.movementKeys['d']*this.vs);
        this.player.updateYVelocity(this.movementKeys['s']*this.vs+this.movementKeys['w']*this.vs*(-1));
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
        this.player.updateXVelocity(this.movementKeys['a']*(-1)*this.vs+this.movementKeys['d']*this.vs);
        this.player.updateYVelocity(this.movementKeys['s']*this.vs+this.movementKeys['w']*this.vs*(-1));
    }

    assignPlayer(player) {
        this.player = player;
    }

    setContext(game) {
        this.game = game;
        this.ctx = game.ctx;
    }

}
