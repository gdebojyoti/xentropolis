"use strict";

function CPlayer() {
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
}

CPlayer.prototype = {
    init: function() {
        this.speed = new THREE.Vector3();
        this.directionRay = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    }
};
