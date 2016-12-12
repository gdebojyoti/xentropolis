"use strict";

function World() {
    this.globalBlockContainer = null;
}

World.prototype = {
    init: function() {
        this.globalBlockContainer = new THREE.Object3D();
    }
};
