"use strict";

var app = window.app || {};

app.blackWhiteWaves = function(){
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.geometry = null;
    this.material = null;
    this.cube = null;
    this.gui = null;
    this.icosahedron = null;
    this.mesh = null;
}

app.blackWhiteWaves.prototype.setup = function () {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.width() / this.height(), this.near(), this.far() );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setClearColor(0x000000, 1);
    this.renderer.setClearColor(0xFFFFFF, 1);

    this.resize();

    var gui = new dat.GUI();

    var container = document.getElementById("canvas-container");

    container.appendChild(this.renderer.domElement );

    // var lights = [];
    // lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    // lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    // lights[ 0 ].position.set( 0, 200, 0 );
    // lights[ 1 ].position.set( 100, 200, 100 );
    // lights[ 2 ].position.set( - 100, - 200, - 100 ); 
    
    // this.scene.add(lights[0]);
    // this.scene.add(lights[1]);
    // this.scene.add(lights[2]);
    
    var ambientLight = new THREE.AmbientLight( 0xcecece ); // bright soft white light
    this.scene.add( ambientLight );

    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh(this.geometry, this.material );
    
    // this.scene.add(this.cube);

    this.icosahedron = new THREE.Object3D();

    this.icosahedron.add( new THREE.LineSegments(

        new THREE.Geometry(),

        new THREE.LineBasicMaterial( {
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        } )

    ) );

    this.icosahedron.add(new THREE.Mesh(

        new THREE.Geometry(),

        new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } )

    ) );

    // var options = chooseFromHash( mesh );

    var data = {
        radius: 10,
        detail: 0
    };

    function generateGeometry() {

        var geometry = new THREE.IcosahedronGeometry(data.radius, data.detail);

        app.game.icosahedron.children[0].geometry.dispose();
        app.game.icosahedron.children[1].geometry.dispose();

        app.game.icosahedron.children[0].geometry = new THREE.WireframeGeometry( geometry );
	    app.game.icosahedron.children[1].geometry = geometry;
    }

    generateGeometry();

    var folder = gui.addFolder( 'THREE.IcosahedronGeometry' );

    folder.add( data, 'radius', 1, 20 ).onChange( generateGeometry );
    folder.add( data, 'detail', 0, 5 ).step( 1 ).onChange( generateGeometry );

    // this.scene.add( this.icosahedron );

    var loader = new THREE.ObjectLoader();
    //var loader = new THREE.JSONLoader();

    loader.load('./data/marmelab.json', function(mesh) {
    //loader.load('./data/marmelab-geometry.json', function(mesh) {
        
        app.game.mesh = mesh;
        app.game.scene.add(mesh);
    });    

    this.camera.position.z = 30;
}

app.blackWhiteWaves.prototype.resize = function () {

    this.camera.aspect = this.width() / this.height();
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width(), this.height());

}

app.blackWhiteWaves.prototype.near = function (){

    return 0.1;
}

app.blackWhiteWaves.prototype.far = function (){

    return 1000;
}

app.blackWhiteWaves.prototype.width = function (){

    return 600;
}

app.blackWhiteWaves.prototype.height = function (){

    return 600;
}

app.blackWhiteWaves.prototype.reset = function () {

}

app.blackWhiteWaves.prototype.loop = function () {
    
    requestAnimationFrame( app.game.loop);
    
    app.game._update();
    
    app.game._render();
    
}

app.blackWhiteWaves.prototype._render = function () {

    this.renderer.render(this.scene, this.camera);
}

app.blackWhiteWaves.prototype._update = function(){

    // this.lastTimestamp = this.currentTimestamp;
    // this.currentTimestamp = millis();

    // var elapsed = (this.currentTimestamp - this.lastTimestamp) * 0.001;

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.icosahedron.rotation.x += 0.01;
    this.icosahedron.rotation.y += 0.01;

    if(this.mesh !== null){
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.mesh.rotation.z += 0.01;
    }
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
            