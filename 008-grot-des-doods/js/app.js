"use strict";

var app = window.app || {};

app.canvas = null;
app.debug = true;
app.game = null;
app.settings = {
	cellSize:120,
	cellThickness:12,
};

app.log = function(argument){
    if(app.debug === true){
        console.log(argument);
    }
}

app.grotDesDoods = function(){
    
    this.title = "Grot des doods v 1.0";
    this.cells = [];
    
    $(".sketch-title").text(this.title);
}

app.grotDesDoods.cell = function(){
    this.index = -1;
    this.x = 0;
    this.y = 0;
    this.topDoor = false;
    this.rightDoor = false;
    this.bottomDoor = false;
    this.leftDoor = false;
    this.texture = null;
}

app.grotDesDoods.prototype.randomInt = function (min, max) {
    return parseInt(min + (Math.random() * (max - min)));
}

app.grotDesDoods.prototype.setup = function () {
	
    app.canvas = createCanvas(app.settings.cellSize * 7, app.settings.cellSize * 5);
    
    app.canvas.parent("canvas-container");

    for (let i = 0; i < 5 * 7; i++) {

        let cell = new app.grotDesDoods.cell();
        
        cell.index = i;
        
        this.cells.push(cell);
    }

    for (let i = 0; i < 6; i++) {

        this.cells[i].rightDoor = true;
        this.cells[i + 1].leftDoor = true;

        this.cells[14 + i].rightDoor = true;
        this.cells[14 + i + 1].leftDoor = true;

        this.cells[28 + i].rightDoor = true;
        this.cells[28 + i + 1].leftDoor = true;
    }

    for (let i = 0; i < 6; i++) {

         this.cells[7 + i].leftDoor = true;
         this.cells[7 + i + 1].rightDoor = true;

         this.cells[21 + i].leftDoor = true;
         this.cells[21 + i + 1].rightDoor = true;
    }

    this.cells[6].bottomDoor = true;
    this.cells[7].topDoor = true;

    this.cells[20].bottomDoor = true;
    this.cells[21].topDoor = true;

    this.cells[13].bottomDoor = true;
    this.cells[14].topDoor = true;

    this.cells[27].bottomDoor = true;
    this.cells[28].topDoor = true;

    this.cells[7].bottomDoor = true;
    this.cells[20].topDoor = true;

    this.cells[18].bottomDoor = true;
    this.cells[23].topDoor = true;

    let plus_key_horizontal = loadImage("content/images/plus-key-horizontal.png");
    let plus_key_vertical = loadImage("content/images/plus-key-vertical.png");
    let plus_heart = loadImage("content/images/plus-heart.png");
    let plus_heart_key = loadImage("content/images/plus-heart-key.png");
    let skeleton = loadImage("content/images/skeleton.png");
    let horse = loadImage("content/images/horse.png");
    let fight = loadImage("content/images/fight.png");
    let treasure = loadImage("content/images/treasure.png");
    let double_treasure = loadImage("content/images/double-treasure.png");

    app.log(plus_key_horizontal);

    this.cells[2].texture = plus_key_horizontal;
    this.cells[7].texture = plus_key_horizontal;
    this.cells[12].texture = plus_key_horizontal;
    this.cells[15].texture = plus_key_horizontal;
    this.cells[20].texture = plus_key_horizontal;
    this.cells[31].texture = plus_key_horizontal;

    this.cells[13].texture = plus_heart;
    this.cells[16].texture = plus_heart;
    this.cells[18].texture = plus_heart;
    this.cells[21].texture = plus_heart;
    this.cells[27].texture = plus_heart;

    this.cells[8].texture = plus_heart_key;
    this.cells[25].texture = plus_heart_key;

    this.cells[6].texture = skeleton;
    this.cells[9].texture = skeleton;
    this.cells[19].texture = skeleton;
    this.cells[26].texture = skeleton;
    this.cells[28].texture = skeleton;
    this.cells[32].texture = skeleton;
    this.cells[33].texture = skeleton;

    this.cells[1].texture = horse;
    this.cells[10].texture = horse;
    this.cells[14].texture = horse;
    this.cells[24].texture = horse;

    this.cells[3].texture = fight;
    this.cells[5].texture = fight;
    this.cells[11].texture = fight;
    this.cells[22].texture = fight;
    this.cells[30].texture = fight;

    this.cells[4].texture = treasure;
    this.cells[17].texture = treasure;
    this.cells[23].texture = treasure;
    this.cells[29].texture = treasure;

    this.cells[34].texture = double_treasure;
    
    app.log(this.cells.length + " cells created");
        
    this.resize();

    $(window).on('resize', function(){
        app.game.resize();
    });
}

app.grotDesDoods.prototype.sizeAndPositionCells = function () {

    let index = 0;
    let x = parseInt(app.canvas.width / 2 - (3.5 * app.settings.cellSize) - (4 * app.settings.cellThickness));
    let y = app.settings.cellThickness;
    let add = true;

    for (let i = 0; i < 5; i++) {

        for (let j = 0; j < 7; j++) {

            let cell = this.cells[index];

            cell.x = x;
            cell.y = y;

            x += add ? app.settings.cellSize : -app.settings.cellSize;

            index++;
        }

        add = !add;

        x += add ? app.settings.cellSize : -app.settings.cellSize;

        y += app.settings.cellSize;
    } 
}

app.grotDesDoods.prototype.reset = function () {

}

app.grotDesDoods.prototype.draw = function () {

    background(255);

    push();

    // this.cells[0].draw();

     this.cells.forEach(function(cell) {
         cell.draw();
     });
    
    pop();
    
    //noLoop();
}

app.grotDesDoods.cell.prototype.draw = function () {

    let doorOffset = parseInt(app.settings.cellSize / 4);

    stroke(238, 231, 213);

    fill(238, 231, 213);
    
	beginShape(QUADS);

    vertex(this.x, this.y);
    vertex(this.x + app.settings.cellSize, this.y);
    vertex(this.x + app.settings.cellSize, this.y + app.settings.cellSize);
    vertex(this.x, this.y + app.settings.cellSize);
    
	endShape();
    
    strokeWeight(app.settings.cellThickness);

    stroke(125, 125, 125);
    
    fill(200, 200, 200);

	beginShape(LINES);
    
    // top
    if(this.topDoor){
        vertex(this.x, this.y);
        vertex(this.x + doorOffset, this.y);

        vertex(this.x + doorOffset + doorOffset + doorOffset, this.y);
        vertex(this.x + app.settings.cellSize, this.y);
    }
    else{
        vertex(this.x, this.y);
        vertex(this.x + app.settings.cellSize, this.y);
    }
    
    // right
    if(this.rightDoor){
        vertex(this.x + app.settings.cellSize, this.y);
        vertex(this.x + app.settings.cellSize, this.y + doorOffset);

        vertex(this.x + app.settings.cellSize, this.y + doorOffset + doorOffset + doorOffset);
        vertex(this.x + app.settings.cellSize, this.y + app.settings.cellSize);
    }
    else{
        vertex(this.x + app.settings.cellSize, this.y);
        vertex(this.x + app.settings.cellSize, this.y + app.settings.cellSize);
    }
    
    // bottom
    if(this.bottomDoor){
        vertex(this.x, this.y + app.settings.cellSize);
        vertex(this.x + doorOffset, this.y + app.settings.cellSize);

        vertex(this.x + doorOffset + doorOffset + doorOffset, this.y + app.settings.cellSize);
        vertex(this.x + app.settings.cellSize, this.y + app.settings.cellSize);
    }
    else{
        vertex(this.x, this.y + app.settings.cellSize);
        vertex(this.x + app.settings.cellSize, this.y + app.settings.cellSize);
    }
    
    // left
    if(this.leftDoor){
        vertex(this.x, this.y);
        vertex(this.x, this.y + doorOffset);

        vertex(this.x, this.y + doorOffset + doorOffset + doorOffset);
        vertex(this.x, this.y + app.settings.cellSize);
    }
    else{
        vertex(this.x, this.y);
        vertex(this.x, this.y + app.settings.cellSize);
    }
    
    endShape();

    if(this.texture != null){

        var h = parseInt(Math.ceil(app.settings.cellThickness / 2));

        image(this.texture, this.x + h, this.y + h, app.settings.cellSize - app.settings.cellThickness, app.settings.cellSize - app.settings.cellThickness);
    }

    let fontSize = Math.max(parseInt(app.settings.cellSize / 8), 10);

    textSize(fontSize);

    strokeWeight(1);

    fill(125, 125, 125);

    text(this.index + 1, this.x + app.settings.cellSize - fontSize - fontSize, this.y + fontSize + fontSize);
}

app.grotDesDoods.prototype.update = function(){

    this.lastTimestamp = this.currentTimestamp;
    this.currentTimestamp = millis();

    var elapsed = (this.currentTimestamp - this.lastTimestamp) * 0.001;

//    this.board.update(elapsed);
}

app.grotDesDoods.prototype.resize = function () {

    app.log("window height: " + $(window).height());
    
    var availableHeight = $(window).height() - 160; // some margin for the title and other html elements

    app.settings.cellSize = parseInt(availableHeight / 5);

    app.log("available height: " + availableHeight);
    // app.log("cellsize: " + app.settings.cellSize);

    resizeCanvas(window.innerWidth, availableHeight, true);

    app.log("canvas width: " + window.innerWidth);
    app.log("canvas height: " + availableHeight);

    
    app.settings.cellSize = parseInt(availableHeight / 5);
    app.settings.cellThickness = Math.max(2, parseInt(app.settings.cellSize / 16));

    app.settings.cellSize = parseInt((availableHeight - (app.settings.cellThickness * 6)) / 5);

    app.log("cell size: " + app.settings.cellSize);
    app.log("cell thickness: " + app.settings.cellThickness);
    
    this.sizeAndPositionCells();
}

app.grotDesDoods.prototype.handleClicks = function () {

//    this.board.handleClicks(mouseX, mouseY);
}

app.grotDesDoods.prototype.handleHover = function () {

    
}

app.grotDesDoods.prototype.handleKeyPress = function () {

//    this.board.handleKeyPress();
}

app.grotDesDoods.prototype.handleKeyRelease = function () {

//    this.board.handleKeyRelease();
}

