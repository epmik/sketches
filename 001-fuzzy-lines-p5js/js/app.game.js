"use strict";

var app = window.app || {};

app.fuzzyLines = function(){

    this.lines = null;
    this.random = new RandomGenerator();
    this.step = 20;
    this.size = 800;
}

app.fuzzyLines.prototype.setup = function () {

    this.lines = []

    for (var i = 0; i < this.size; i += this.step) {

      var line = [];

      for (var j = 0; j < this.size; j += this.step) {

        var r = this.random.value() * 20 * i / this.size * j / this.size;
          
        line.push({ x: j, y: i + r });

      }

      this.lines.push(line);
    } 
}

app.fuzzyLines.prototype.width = function (){

    return 600;
}

app.fuzzyLines.prototype.height = function (){

    return 600;
}

app.fuzzyLines.prototype.draw = function () {

//    background(255);

    push();
    
    smooth();

    stroke(0);

    noFill();

    for (var i = 0; i < 4; i++) {
    
        this.drawLines();
    }

    pop();
    
    noLoop();
}

app.fuzzyLines.prototype.drawLines = function () {

    for (var i = 0; i < this.size; i += this.step) {
        
        beginShape();

        for (var j = 0; j < this.size; j += this.step) {

            var r = this.random.value() * 20 * i / this.size * j / this.size;
          
            vertex(j, i + r);

        }

        endShape();
    } 
}

app.fuzzyLines.prototype.update = function(){

    this.lastTimestamp = this.currentTimestamp;
    this.currentTimestamp = millis();

    var elapsed = (this.currentTimestamp - this.lastTimestamp) * 0.001;

//    this.board.update(elapsed);
}

app.fuzzyLines.prototype.handleClicks = function () {

//    this.board.handleClicks(mouseX, mouseY);
}

app.fuzzyLines.prototype.handleHover = function () {

    
}

app.fuzzyLines.prototype.handleKeyPress = function () {

//    this.board.handleKeyPress();
}

app.fuzzyLines.prototype.handleKeyRelease = function () {

//    this.board.handleKeyRelease();
}
