"use strict";

function World() {
    this.globalBlockContainer = null;
}

World.prototype = {
    init: function() {
        this.globalBlockContainer = new THREE.Object3D();

        this.setup();
    },
    setup: function() {
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200,5), new THREE.MeshBasicMaterial({color: 0xee5522}));
        plane.position.y = 0;
        plane.rotation.x = - 90 * Math.PI / 180;
        renderer.scene.add(plane);

        // sample cube
        var cube = new THREE.Mesh(new THREE.BoxGeometry(5,5,5), new THREE.MeshBasicMaterial({
                color: 0xffeedd,
                // wireframe: true
            }));
        cube.position.y = 0;
        cube.position.z = -50;
        this.globalBlockContainer.add(cube);

        renderer.scene.add(this.globalBlockContainer);
    }
};
