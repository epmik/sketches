"use strict";

function setup() {
  
    app.game = new app.walkDropBlock();
    
    app.game.setup();
}

function draw() {
    
    app.game.update();
    
    app.game.draw();
}

function mousePressed() {

    app.game.handleClicks();
    
}

function mouseMoved() {

    app.game.handleHover();
    
}

function keyPressed() {
    
    app.game.handleKeyPress();

}

function keyReleased() {

    app.game.handleKeyRelease();
    
}