"use strict";

function World() {
    this.globalBlockContainer = null;
    this.cubeSide = 2;
}

World.prototype = {
    init: function() {
        this.globalBlockContainer = new THREE.Object3D();

        this.setup();
    },
    setup: function() {
        this.generateGround();

        // sample cube
        this.createBlock({x: 0, y: 6, z: -50});

        renderer.scene.add(this.globalBlockContainer);
    },
    generateGround: function() {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(10000,10000,5), new THREE.MeshBasicMaterial());
        plane.position.y = 0;
        plane.rotation.x = - 90 * Math.PI / 180;
        renderer.scene.add(plane);
        var planeTextureLoader = new THREE.TextureLoader();
        planeTextureLoader.load("images/grass.jpg", function(tex) {
            tex.repeat.set(500, 500);
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            plane.material.map = tex;
            plane.material.needsUpdate = true;
        });
    },
    createBlock: function(position) {
        var cube = (new Block()).init();
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;

        this.globalBlockContainer.add(cube);
    },
    // destroy block by id
    destroyBlock: function(id) {
        // fetch mesh by id
        var mesh = this.globalBlockContainer.getObjectById(id);

        // remove mesh from globalBlockContainer
        this.globalBlockContainer.remove(mesh);
    }
};
