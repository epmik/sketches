"use strict";

var app = window.app || {};

app.canvas = null;
app.debug = true;
app.game = null;
app.settings = {
	cellSize:120,
    cellThickness:12,
    pilarHeight:50,
};

app.log = function(argument){
    if(app.debug === true){
        console.log(argument);
    }
}

app.pilar = function(){

    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.distanceToNextPilarId = 1;
}

app.pilar.prototype.draw = function(){

    stroke(64, 64, 64);

    fill(64, 64, 64);
    
	beginShape(QUADS);

    vertex(this.x, this.y);
    vertex(this.x + this.width, this.y);
    vertex(this.x + this.width, this.y + app.settings.pilarHeight);
    vertex(this.x, this.y + app.settings.pilarHeight);
    
	endShape();
}

app.pilar.prototype.update = function(elapsedSeconds, scrollSpeedPerSecond){

    this.x -= elapsedSeconds * scrollSpeedPerSecond;

}

app.block = function(){

    this.x = 0;
    this.y = 0;
    this.width = 50;
}

app.walkDropBlock = function(){
    
    this.title = "Walk drop block v 1.0";
    this.lastTimestamp = 0;
    this.currentTimestamp = 0;
    this.scrollSpeedPerSecond = 0;
    this.pilars = [];
    this.blocks = [];
    
    $(".sketch-title").text(this.title);
}

app.walkDropBlock.prototype.randomInt = function (min, max) {
    return parseInt(min + (Math.random() * (max - min)));
}

app.walkDropBlock.prototype.setup = function () {
	
    app.canvas = createCanvas(0, 0);
    
    app.canvas.parent("canvas-container");

    var pilar1 = new app.pilar();

    pilar1.x = window.innerWidth + 1;
    pilar1.y = 0;
    pilar1.width = 50;

    this.pilars.push(pilar1);

    var pilar2 = new app.pilar();

    pilar2.x = window.innerWidth + 200;
    pilar2.y = 0;
    pilar2.width = 50;

    this.pilars.push(pilar2);
        
    this.resize();

    $(window).on('resize', function(){
        app.game.resize();
    });
}

app.walkDropBlock.prototype.reset = function () {

}

app.walkDropBlock.prototype.draw = function () {

    background(255);

    push();

    // this.cells[0].draw();

    for(let i = 0; i < this.pilars.length; i++){

        if(this.pilars[i] == null){
            continue;
        }

        this.pilars[i].draw();

    }
    
    pop();
    
    //noLoop();
}

app.walkDropBlock.prototype.randomPilar = function () {

    var pilar = new app.pilar();

    var blockSize = app.canvas.width / 10;
    
    pilar.x = window.innerWidth + (this.randomInt(1, 4) * blockSize);
    pilar.y = app.canvas.height - app.settings.pilarHeight;//window.innerHeight - app.settings.pilarHeight;
    pilar.width = this.randomInt(2, 9) * 10;

    return pilar;
}

app.walkDropBlock.prototype.update = function(){

    this.lastTimestamp = this.currentTimestamp;
    this.currentTimestamp = millis();

    var elapsedSeconds = (this.currentTimestamp - this.lastTimestamp) * 0.001;

    let newPilarCount = 0;

    // update positions
    for(let i = 0; i < this.pilars.length; i++){

        if(this.pilars[i] == null){
            continue;
        }

        var x = this.pilars[i].x;

        this.pilars[i].x -= elapsedSeconds * this.scrollSpeedPerSecond;

        if(x >= window.innerWidth && this.pilars[i].x < window.innerWidth){

            // new pilar needed
            newPilarCount++;
        }
    }

    // insert new pilars
    for(let i = 0; i < newPilarCount; i++){

        let inserted = false;
        
        for(let i = 0; i < this.pilars.length && inserted === false; i++){

            if(this.pilars[i] != null){
                continue;
            }

            this.pilars[i] = this.randomPilar();

            inserted = true;
        }

        if(inserted === false){
            this.pilars.push(this.randomPilar());
        }
    }

    // remove pilars that have scrolled offscreen
    for(let i = 0; i < this.pilars.length; i++){

        if(this.pilars[i] == null){
            continue;
        }

        if(this.pilars[i].x + this.pilars[i].width < 0){
            this.pilars[i] = null;
        }
     }

//    this.board.update(elapsed);
}

app.walkDropBlock.prototype.resize = function () {

    app.log("window height: " + $(window).height());
    
    var availableHeight = $(window).height() - 160; // some margin for the title and other html elements

    app.log("available height: " + availableHeight);

    resizeCanvas(window.innerWidth, availableHeight, true);

    app.log("canvas width: " + window.innerWidth);
    app.log("canvas height: " + availableHeight);
    
    // 5 seconds to scroll to whole screen width
    this.scrollSpeedPerSecond = window.innerWidth / 5;

}

app.walkDropBlock.prototype.handleClicks = function () {

//    this.board.handleClicks(mouseX, mouseY);
}

app.walkDropBlock.prototype.handleHover = function () {

    
}

app.walkDropBlock.prototype.handleKeyPress = function () {

//    this.board.handleKeyPress();
}

app.walkDropBlock.prototype.handleKeyRelease = function () {

//    this.board.handleKeyRelease();
}

