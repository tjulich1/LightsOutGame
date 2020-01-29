/**
* Trent Julich
* 27 January 2020
**/

class PlayerMovementHandler {

    /**
    * Constructor for a new movement handler.
    **/
    constructor(velocityScale) {

        // Fields must be set before movement handler can be used.
        this.ctx = undefined;
        this.game = undefined;
        this.player = undefined;

        // Array containing the keys which will affect player movement.
        var movementKeys = [];
        movementKeys['a'] = 0;
        movementKeys['s'] = 0;
        movementKeys['d'] = 0;
        movementKeys['w'] = 0;
        this.movementKeys = movementKeys;
        this.vs = velocityScale;
    }

    /**
    * Function called when a key is pressed down. Handles input relating to
    * the players movement.
    **/
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

    /**
    * Function which is called when a key is released. Handles input cases
    * affecting the users movement.
    **/
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

    /**
    * Sets the player that should react to user input.
    **/
    assignPlayer(player) {
        this.player = player;
    }

    /**
    * Sets the game which is connected to the player input.
    **/
    setContext(game) {
        this.game = game;
        this.ctx = game.ctx;
    }

    // DEBUG

    /**
    * Function used to set the velocity scale of the players movement.
    **/
    set velocityScale(newScale) {
        this.vs = newScale;
    }

}
