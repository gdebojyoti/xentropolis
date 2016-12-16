"use strict";

var type = {
    DIRT: 1,
    WOOD: 2
}

function Block() {
    this.type = null;
    this.mesh = null;
    this.cubeSide = 2;

    // return this.init();
}

Block.prototype = {
    // create block
    init: function(x = this.cubeSide, y = this.cubeSide, z = this.cubeSide) {
        var ownObject = this;

        var geom = new THREE.BoxGeometry(x, y, z);
        var mat = new THREE.MeshBasicMaterial({
                color: 0xe67e22,
                transparent: true
            });
        this.mesh = new THREE.Mesh(geom, mat);

        this.mesh.castShadow = true;

        var textureLoader = new THREE.TextureLoader();
        textureLoader.load(
                "images/circuit_pattern.png", function(tex) {
                    ownObject.mesh.material.map = tex;
                    ownObject.mesh.material.needsUpdate = true;
                    console.log(tex);
                },
                // on progress
                function ( xhr ) { console.log( (xhr.loaded / xhr.total * 100) + '% loaded' ) },
                // on error
                function ( xhr ) { console.log( xhr ) }
            );

        return this.mesh;
    }
};
