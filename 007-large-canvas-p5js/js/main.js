"use strict";

//var element = null;
//var grid = null;
//var button = null;

function setup() {
  
    app.sketch = new app.largeCanvasSketch();
    
    app.sketch.setup();
}

function draw() {
    
    app.sketch.update();
    
    app.sketch.draw();
}

function mousePressed() {

    app.sketch.handleClicks();
    
}

function mouseMoved() {

    app.sketch.handleHover();
    
}

function keyPressed() {
    
    app.sketch.handleKeyPress();

}

function keyReleased() {

    app.sketch.handleKeyRelease();
    
}