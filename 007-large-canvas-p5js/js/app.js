"use strict";

var app = window.app || {};

app.canvas = null;
app.debug = true;
//app.debugFunctionCalls = true;
app.debugHoverAreas = false;
app.sketch = null;
app.clickedTriangles = [];
app.settings = {

    triangleRadius:50,
    triangleHorizontalMargin:12,
    triangleVerticalMargin:12,
	triangleMinPulseFactor:1,
	triangleMaxPulseFactor:1.3,
	trianglePulseSpeed:2,	// pulse duration from min to max in seconds
	dotMinPulseFactor:1,
	dotMaxPulseFactor:1.5,
	dotPulseSpeed:2,			// pulse duration from min to max in seconds
	dotSize:12,			// pulse duration from min to max in seconds

	printDpi:300,
	printWidthInMm:500,
	printHeightInMm:500,

	lineWidthInMm:0.25,

	displayHeight:500,
	displayWidth:800,

};

app.log = function(argument){
    if(app.debug === true){
        console.log(argument);
    }
}

app.maze = function(width, height){

    if(height === undefined || height === null){
        height = width;
    }

    this.width = width;
    this.height = height;
    this.cells = [];
}

app.maze.cell = function(){
    this.index = -1;
    this.mask = 0;
    this.northWall = 1;
    this.eastWall = 1;
    this.southWall = 1;
    this.westWall = 1;
}

app.maze.walker = function(){
    this.maze = null;
    this.walkerCells = [];
    this.currentCellIndex = -1;
    this.entryCellIndex = -1;
    this.exitCellIndex = -1;
    this.exitCellStepCount = -1;
    this.walkStepCount = -1;
}

app.maze.walker.cell = function(){
    this.cellIndex = -1;
    this.previousVisitedCellIndex = -1;
    this.isRoute = false;
}

app.maze.walker.prototype.walk = function(){

    this.exitCellIndex = this.entryCellIndex = this.currentCellIndex = this.findRandomStartCell();
    this.exitCellStepCount = this.walkStepCount = 0;

    var entryCell = new Mazeapp.maze.walker.cell();

    entryCell.cellIndex = this.currentCellIndex;
    entryCell.previousVisitedCellIndex = -1;
    entryCell.isRoute = true;

    this.walkerCells.push(entryCell);

    console.log("starting at " + this.entryCellIndex);

    this.removeRandomExternalWall(entryCell);

    this.recursiveWalkCells();

    console.log("ending at " + this.exitCellIndex);

    var exitCell = this.FindWalkerCell(this.exitCellIndex);
    exitCell.isRoute = true;

    this.removeRandomExternalWall(exitCell);
}

app.maze.walker.prototype.recursiveWalkCells = function () {

    var currentWalkerCell = this.findCurrentWalkerCell();

    var neighbours = this.FindUnvisitedCellNeighbours(currentWalkerCell);

    if (neighbours === null || neighbours.length == 0) {

        if (currentWalkerCell.cellIndex === this.entryCellIndex) {
            return;
        }

        // backtrack
        this.currentCellIndex = currentWalkerCell.previousVisitedCellIndex;

        if (this.walkerCells.length < this.maze.cells.length) {
            currentWalkerCell.IsRoute = false;
        }

        this.walkStepCount--;

        console.log("back tracking to " + this.currentCellIndex);
    }
    else {

        // pick a random neighbour
        // make it the current cell
        // continue walking

        this.walkStepCount++;

        currentWalkerCell = new Mazeapp.maze.walker.cell();

        currentWalkerCell.cellIndex = neighbours[this.RandomInt(0, neighbours.length)];
        currentWalkerCell.previousVisitedCellIndex = this.currentCellIndex;
        currentWalkerCell.IsRoute = true;
        this.CurrentCellIndex = currentWalkerCell.cellIndex;

        if (this.isExternalCell(currentWalkerCell)) {
            if (this.walkStepCount > this.exitCellStepCount) {
                this.exitCellStepCount = this.walkStepCount;
                this.exitCellIndex = currentWalkerCell.cellIndex;

                console.log("found exit cell " + this.exitCellIndex);
            }
        }

        this.walkerCells.push(currentWalkerCell);

        var previousCell = this.maze.Cells[currentWalkerCell.previousVisitedCellIndex];
        var currentCell = this.maze.Cells[currentWalkerCell.cellIndex];

        if (currentWalkerCell.cellIndex > currentWalkerCell.previousVisitedCellIndex) {
            // right or front
            if (currentWalkerCell.cellIndex === currentWalkerCell.previousVisitedCellIndex + 1) {
                // right
                previousCell.removeEastWall();
                currentCell.removeWestWall();
            }
            else {
                // front
                previousCell.removeNorthWall();
                currentCell.removeSouthWall();
            }
        }
        else {
            // left or back
            if (currentWalkerCell.CellIndex === currentWalkerCell.previousVisitedCellIndex - 1) {
                // left
                previousCell.removeWestWall();
                currentCell.removeEastWall();
            }
            else {
                // back
                previousCell.removeSouthWall();
                currentCell.removeNorthWall();
            }
        }

        console.log("walking to " + currentWalkerCell.CellIndex);
    }

    this.recursiveWalkCells();
}

app.maze.walker.prototype.findRandomStartCell = function () {

    //return 0;

    var side = this.randomInt(0, 4);

    if (side === 0) {
        // back side
        return this.randomInt(0, this.maze.settings.elementCount.X);
    }

    if (side === 1) {
        // left side
        return this.maze.settings.ElementCount.X - 1 + (this.randomInt(0, this.maze.settings.ElementCount.Y) * this.maze.settings.ElementCount.X);
    }

    if (side === 2) {
        // front side
        return (this.maze.settings.ElementCount.X * (this.maze.settings.ElementCount.Y - 1)) + this.randomInt(0, this.maze.settings.ElementCount.X);
    }

    // right side
    return this.randomInt(0, this.maze.settings.ElementCount.Y) * this.maze.settings.ElementCount.X;
}

app.maze.walker.prototype.removeRandomExternalWall = function (walkerCell) {

    var externalWalls = this.findExternalWalls(walkerCell);

    if (externalWalls === null || externalWalls.length == 0) {
        return;
    }

    console.log("found external walls" + externalWalls);
    console.log(externalWalls);

    var externalWall = externalWalls[this.randomInt(0, externalWalls.length)];

    this.removeExternalWall(walkerCell, externalWall);
}

app.maze.walker.cell.prototype.findCurrentWalkerCell = function () {
    return this.findWalkerCell(this.currentCellIndex);
}

app.maze.cell.prototype.removeWestWall = function () {
    this.westWall = 0;
}

app.maze.cell.prototype.removeEastWall = function () {
    this.eastWall = 0;
}

app.maze.cell.prototype.removeSouthWall = function () {
    this.southWall = 0;
}

app.maze.cell.prototype.removeNorthWall = function () {
    this.northWall = 0;
}

app.maze.cell.prototype.removeWalls = function () {
    this.removeNorthWall();
    this.removeEastWall();
    this.removeSouthWall();
    this.removeWestWall();
}

app.maze.walker.prototype.randomInt = function (min, max) {
    return parseInt(min + (Math.random() * (max - min)));
}

app.largeCanvasSketch = function(){
    
    this.title = "Large Canvas";
    
    $(".sketch-title").text(this.title);
}

app.largeCanvasSketch.prototype.setup = function () {
	
    app.canvas = createCanvas(
		app.math.mmToPixels(app.settings.printWidthInMm, app.settings.printDpi), 
		app.math.mmToPixels(app.settings.printWidthInMm, app.settings.printDpi));
    
	app.canvas.parent("canvas-container");
	
	this.lineWidth = app.math.mmToPixels(app.settings.lineWidthInMm, app.settings.printDpi);
    
    $(".save-frame").on("click", function() {
    
        var title = app.sketch.title + "." + app.utility.sortableDateTimeString();

        saveCanvas(app.canvas, title, "png");
        
        return false;
    });
}

app.largeCanvasSketch.prototype.reset = function () {

}

app.largeCanvasSketch.prototype.draw = function () {

    background(255);

    push();
    
    noFill();
    
    strokeWeight(this.lineWidth);
    
    stroke(125, 125, 125);
    
    for (let x = this.lineWidth; x < app.canvas.width; x += this.lineWidth + this.lineWidth) {
		 
		this.drawLine(x);
    }
    
    pop();
    
    //noLoop();
}

app.largeCanvasSketch.prototype.drawLine = function (x) {

	beginShape();
	
	vertex(x, 0);
	vertex(x, app.canvas.height);
    
    // short lines are drawn from point x: 0 to width, at height y
    // y is incremented with a tiny amount so that overdraw occures
    
//     this.points.forEach(p => {
        
//         vertex(p[0] + random(3), p[1] + random());
        
// //        p[1] += noise(
// //            p[0] * this.noiseScale.x, 
// //            frameCount * this.noiseScale.y + p[1] / this.noiseYdivider) / this.totalNoiseDivider;
        
//         // a higher this.totalNoiseDivider decreases the y-step and creates more overdraw
        
//         p[1] += noise(
//             p[0] * this.noiseScale.x, 
//             p[1] * this.noiseScale.y / this.noiseYdivider) / this.totalNoiseDivider;
        
//     });
    
    endShape();
}

app.largeCanvasSketch.prototype.update = function(){

    this.lastTimestamp = this.currentTimestamp;
    this.currentTimestamp = millis();

    var elapsed = (this.currentTimestamp - this.lastTimestamp) * 0.001;

//    this.board.update(elapsed);
}

app.largeCanvasSketch.prototype.handleClicks = function () {

//    this.board.handleClicks(mouseX, mouseY);
}

app.largeCanvasSketch.prototype.handleHover = function () {

    
}

app.largeCanvasSketch.prototype.handleKeyPress = function () {

//    this.board.handleKeyPress();
}

app.largeCanvasSketch.prototype.handleKeyRelease = function () {

//    this.board.handleKeyRelease();
}

