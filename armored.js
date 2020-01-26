class Armored extends Enemy{
    constructor(){
        //filler numbers for health, xvelo, and yvelo.
        super(game, x, y,width, height, 200, 15, 15);
    }

    draw(){
        //may need to be over written in subclasses
    }
}