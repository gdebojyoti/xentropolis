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

    this.crosshair = null;

    this.directionRay = null;
    this.pointer = null;

    this.intersects = {
        globalBlockContainer: null
    };
    this.currentSelectedObj = null;
    this.previousSelectedObj = null;
}

CPlayer.prototype = {
    init: function() {
        this.speed = new THREE.Vector3();
        this.directionRay = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        // Create the pointer object (cyan ring)
        this.crosshair = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, .2, 10),
            new THREE.MeshLambertMaterial( { color: 0x00ffff, transparent: true, opacity: 0.7 } )
        );
        this.crosshair.renderOrder = 2;
        this.crosshair.name = "VR Intersect Indicator";
        this.crosshair.position.x = 0;
        this.crosshair.position.y = 0;
        this.crosshair.position.z = 10;
    },
    setup: function() {
        renderer.scene.add(this.crosshair);

        // first person controls
        this.controls = new THREE.PointerLockControls( renderer.camera );
        this.player = this.controls.getObject();
    },
    displayView: function() {
        this.pointer = new THREE.Raycaster( player.player.position, this.controls.getDirection(), 0, 50 );
        this.intersects.globalBlockContainer = this.pointer.intersectObjects(renderer.world.globalBlockContainer.children,true);
        if(this.intersects.globalBlockContainer.length > 0) {
            this.currentSelectedObj = this.intersects.globalBlockContainer[0];
            this.currentSelectedObj.object.material.opacity = 0.3;

            if(this.previousSelectedObj === null || this.previousSelectedObj.object.uuid !== this.currentSelectedObj.object.uuid) {
                if(this.previousSelectedObj !== null) this.previousSelectedObj.object.material.opacity = 1;
                this.previousSelectedObj = this.currentSelectedObj
            }

            this.updateCrosshair(this.intersects.globalBlockContainer[0]);
        }
        else {
            this.currentSelectedObj = null;
            this.updateCrosshair(null);

            if(this.previousSelectedObj !== null) this.previousSelectedObj.object.material.opacity = 1;
        }
    },
    updateCrosshair: function(intersectedObject) {
        if(intersectedObject === null) {
            this.setCrosshairVisibility(false);
        }
        else {
            this.setCrosshairPosition(intersectedObject.point);
            this.setCrosshairRotation(intersectedObject.face.normal);
            this.setCrosshairVisibility(true);
        }
    },
    setCrosshairVisibility: function(status) {
        this.crosshair.visible = status;
    },
    // Set position of crosshair
    setCrosshairPosition: function(pos) {
        this.crosshair.position.x = pos.x;
        this.crosshair.position.y = pos.y;
        this.crosshair.position.z = pos.z;
    },
    // Set rotation of crosshair
    setCrosshairRotation: function(rot) {
        this.crosshair.rotation.set(
                Math.asin(rot.z),
                0,
                Math.asin(rot.x)
            );
    },
    createBlock: function(intersectedObject) {
        // if nothing is highlighted, exit
        if(this.currentSelectedObj === null || !this.controls.enabled) return;

        var intersectedObject = this.currentSelectedObj;
        var pointOfIntersection = intersectedObject.point;
        var currentSelectedObjCenter = this.currentSelectedObj.object.position;

        var activeAxis = "";

        // x > y
        if(Math.abs(pointOfIntersection.x - currentSelectedObjCenter.x) > Math.abs(pointOfIntersection.y - currentSelectedObjCenter.y)) {
            // x > z
            if(Math.abs(pointOfIntersection.x - currentSelectedObjCenter.x) > Math.abs(pointOfIntersection.z - currentSelectedObjCenter.z)) {
                // x is largest
                activeAxis = "x";
            }
            else {
                // z is largest
                activeAxis = "z";
            }
        }
        // y > x
        else {
            // y > z
            if(Math.abs(pointOfIntersection.y - currentSelectedObjCenter.y) > Math.abs(pointOfIntersection.z - currentSelectedObjCenter.z)) {
                // y is largest
                activeAxis = "y";
            }
            else {
                // z is largest
                activeAxis = "z";
            }
        }

        var newBlockCenter = $.extend(true, {}, currentSelectedObjCenter);

        if(pointOfIntersection[activeAxis] > currentSelectedObjCenter[activeAxis]) newBlockCenter[activeAxis] += renderer.world.cubeSide;
        else newBlockCenter[activeAxis] -= renderer.world.cubeSide;

        renderer.world.createBlock(newBlockCenter);
    }
};
