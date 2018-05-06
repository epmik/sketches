"use strict";

var app = window.app || {};

app.game = new app.blackWhiteWaves();
app.game.setup();

$(".sketch-title").text("Import Mesh");

$(window).on('resize', function(){
    app.game.resize();
});

app.game.loop();
