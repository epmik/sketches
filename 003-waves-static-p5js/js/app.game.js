"use strict";

var app = window.app || {};

app.blackWhiteWaves = function(){
    
    this.title = "Waves 001 Static";
    
    this.points = null;
    
    this.stepsPerFrame = 14;
    
    // low x-scale introduces vertical stripes, or drip lines
    this.noiseScale = { x: 0.002, y: 4, z: 1 };
    
    this.noiseYdivider = 30;
    this.totalNoiseDivider = 3;
    
    $(".sketch-title").text(this.title);    
    $("#noise-scale-x").val(this.noiseScale.x);
    $("#noise-scale-y").val(this.noiseScale.y);
    $("#noise-y-divider").val(this.noiseYdivider);
    $("#total-noise-divider").val(this.totalNoiseDivider);
}

app.blackWhiteWaves.prototype.setup = function () {

    this.points = [];
    
    for (let i = 0; i < this.width(); i++) {
        this.points.push([i, 0]);
    }
    
    this.reset();
    
//    this.noiseScale.x = random(0.00051, 0.004);
//    this.noiseScale.y = random(0.001, 0.08);
    
    $("#noise-scale-x").on("change paste", function() {
        
        var v = parseFloat($(this).val());
        
        if(isNaN(v === NaN)){
            v = 0.002;
            $(this).val(v);
        }
        
        app.game.noiseScale.x = v;
        app.game.reset();
    });
    
    $("#noise-scale-y").on("change paste", function() {
        
        var v = parseFloat($(this).val());

        if(isNaN(v)){
            v = 4;
            $(this).val(v);
        }
        
        app.game.noiseScale.y = v;
        app.game.reset();
    });
    
    $("#noise-y-divider").on("change paste", function() {
        
        var v = parseFloat($(this).val());

        if(isNaN(v)){
            v = 30;
            $(this).val(v);
        }
        
        app.game.noiseYdivider = v;
        app.game.reset();
    });
    
    $("#total-noise-divider").on("change paste", function() {
        
        var v = parseFloat($(this).val());

        if(isNaN(v)){
            v = 3;
            $(this).val(v);
        }
        
        app.game.totalNoiseDivider = v;
        app.game.reset();
    });
    
    $("#save-animation").on("click", function() {
    
        var title = app.game.title + "." + app.utility.sortableDateTimeString();

        saveCanvas(app.canvas, title, "png");
        
        return false;
    });
}

app.blackWhiteWaves.prototype.width = function (){

    return 600;
}

app.blackWhiteWaves.prototype.height = function (){

    return 600;
}

app.blackWhiteWaves.prototype.reset = function () {

    for (let i = 0; i < this.width(); i++) {
        this.points[i][1] = 0;
    }
    
    background(255);
}

app.blackWhiteWaves.prototype.draw = function () {

    //background(255);

    push();
    
    noFill();
    
    strokeWeight(2);
    
    stroke(125, 125, 0, 10);
    
    for (let i = 0; i < this.stepsPerFrame; i++) {
        this.drawLine();
    }
    
    pop();
    
    //noLoop();
}

app.blackWhiteWaves.prototype.drawLine = function () {

    beginShape();
    
    // short lines are drawn from point x: 0 to width, at height y
    // y is incremented with a tiny amount so that overdraw occures
    
    this.points.forEach(p => {
        
        vertex(p[0] + random(3), p[1] + random());
        
//        p[1] += noise(
//            p[0] * this.noiseScale.x, 
//            frameCount * this.noiseScale.y + p[1] / this.noiseYdivider) / this.totalNoiseDivider;
        
        // a higher this.totalNoiseDivider decreases the y-step and creates more overdraw
        
        p[1] += noise(
            p[0] * this.noiseScale.x, 
            p[1] * this.noiseScale.y / this.noiseYdivider) / this.totalNoiseDivider;
        
    });
    
    endShape();
}

app.blackWhiteWaves.prototype.update = function(){

    this.lastTimestamp = this.currentTimestamp;
    this.currentTimestamp = millis();

    var elapsed = (this.currentTimestamp - this.lastTimestamp) * 0.001;

//    this.board.update(elapsed);
}

app.blackWhiteWaves.prototype.handleClicks = function () {

//    this.board.handleClicks(mouseX, mouseY);
}

app.blackWhiteWaves.prototype.handleHover = function () {

    
}

app.blackWhiteWaves.prototype.handleKeyPress = function () {

//    this.board.handleKeyPress();
}

app.blackWhiteWaves.prototype.handleKeyRelease = function () {

//    this.board.handleKeyRelease();
}
