"use strict";

function CPlayer() {
    this.controls = null;
    this.player = null;
    this.speed = null;
    this.movement = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        canJump: false
    };
    this.directionRay = null;
    this.pointer = null;
    this.intersects = {
        globalBlockContainer: null
    }
}

CPlayer.prototype = {
    init: function() {
        this.speed = new THREE.Vector3();
        this.directionRay = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    },
    setup: function() {
        // first person controls
        this.controls = new THREE.PointerLockControls( renderer.camera );
        this.player = this.controls.getObject();
    },
    looper: function() {
        this.pointer = new THREE.Raycaster( player.player.position, this.controls.getDirection(), 0, 10 );
        this.intersects.globalBlockContainer = this.pointer.intersectObjects(renderer.world.globalBlockContainer.children,true);
        if(this.intersects.globalBlockContainer.length > 0) {
            console.log("Hit!");
            // console.log(this.intersects.globalBlockContainer);
        }
    }
};
