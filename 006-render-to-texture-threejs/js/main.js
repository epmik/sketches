"use strict";

app.game = new app.blackWhiteWaves();
app.game.setup();
app.game.loop();

window.addEventListener( 'resize', function () {
    app.game.resize();
}, false );
