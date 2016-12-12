"use strict";

function CPlayer() {
    this.m_cPlayer = null;
    this.m_cSpeed = null;
    this.m_cMovement = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        canJump: false
    };
    this.m_cDirectionRay = null;
}

CPlayer.prototype = {
    init: function() {
        this.m_cSpeed = new THREE.Vector3();
        this.m_cDirectionRay = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    }
}
