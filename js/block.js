"use strict";

var type = {
    DIRT: 1,
    WOOD: 2
}

function Block() {
    this.type = null;
    this.mesh = null;
}

Block.prototype = {
    init: function() {
        var geom = new THREE.BoxGeometry(5,5,5);
        var mat = new THREE.MeshBasicMaterial({
                color: 0xff0033,
                wireframe: true
            });
        this.mesh = new THREE.Mesh(geom, mat);
    }
};
