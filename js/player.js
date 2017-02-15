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
    this.collision = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false
    };

    this.crosshairEnabled = true;
    this.crosshair = null;

    this.directionRay = null;
    this.pointer = null;

    this.disruptState = false; // if true, will destroy block; set to true by pressing and holding 'Ctrl' key

    this.intersects = {
        globalBlockContainer: null
    };
    this.currentSelectedObj = null;
    this.previousSelectedObj = null;
    this.currentSelectedObjOpacity = 0.75;
}

CPlayer.prototype = {
    init: function() {
        this.speed = new THREE.Vector3();
        this.directionRay = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
    },
    setup: function() {
        this.initCrosshair();

        // first person controls
        this.controls = new THREE.PointerLockControls( renderer.camera );
        this.player = this.controls.getObject();
    },
    // initialize crosshair
    initCrosshair: function() {
        if(!this.isCrosshairEnabled()) return;

        // Create the pointer object (cyan ring)
        this.crosshair = new THREE.Mesh(
            new THREE.CylinderGeometry(.1, .1, .05, 6),
            new THREE.MeshLambertMaterial( { color: 0xff0000, transparent: true, opacity: 0.8 } )
        );
        this.crosshair.renderOrder = 2;
        this.crosshair.name = "VR Intersect Indicator";
        this.crosshair.position.x = 0;
        this.crosshair.position.y = 0;
        this.crosshair.position.z = 10;

        renderer.scene.add(this.crosshair);
    },
    isCrosshairEnabled: function() {
        return this.crosshairEnabled;
    },
    // mark current block, and update player compass
    displayView: function() {
        // mark the block (set opacity to 'currentSelectedObjOpacity') that the player is currently looking at
        this.pointer = new THREE.Raycaster( this.player.position, this.controls.getDirection(), 0, 50 );
        this.intersects.globalBlockContainer = this.pointer.intersectObjects(renderer.world.globalBlockContainer.children, true);
        if(this.intersects.globalBlockContainer.length > 0) {
            this.currentSelectedObj = this.intersects.globalBlockContainer[0];

            // mark current block
            this.currentSelectedObj.object.material.opacity = this.currentSelectedObjOpacity;

            // if current block is not same as previous block
            if(this.previousSelectedObj === null || this.previousSelectedObj.object.uuid !== this.currentSelectedObj.object.uuid) {
                // unmark previous block
                if(this.previousSelectedObj !== null) this.previousSelectedObj.object.material.opacity = 1;

                // store current block in previous block variable
                this.previousSelectedObj = this.currentSelectedObj;
            }

            if(this.isCrosshairEnabled()) this.updateCrosshair(this.intersects.globalBlockContainer[0]);
        }
        else {
            this.currentSelectedObj = null;
            if(this.isCrosshairEnabled()) this.updateCrosshair(null);

            if(this.previousSelectedObj !== null) this.previousSelectedObj.object.material.opacity = 1;
        }

        this.updateCompass(player.player.rotation.y);
    },
    // update compass according to player rotation
    updateCompass: function(angle) {
        $(".compass").css("transform", "rotateZ(" + (angle * 180 / Math.PI - 45) + "deg)"); // allow 45 deg for rotated camera image in png
    },
    checkForCollisions: function() {
        var front = new THREE.Vector3(this.controls.getDirection().x, 0, this.controls.getDirection().z).normalize();
        var side = new THREE.Vector3(this.controls.getDirection().x, 0, this.controls.getDirection().z).normalize()
                .applyAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI / 2);

        // emit directional rays
        var pointer = new THREE.Raycaster(new THREE.Vector3(this.player.position.x, 1, this.player.position.z), front, 0, 5);
        // for each directional ray, check for collision at a distance X
        var collidingWith = pointer.intersectObjects(renderer.world.globalBlockContainer.children, true);
        // if collision occurs, set movement speed in that direction to 0
        if(collidingWith.length > 0) this.collision.forward = true;
        else this.collision.forward = false;

        var pointer = new THREE.Raycaster(new THREE.Vector3(this.player.position.x, 1, this.player.position.z), side, 0, 5);
        var collidingWith = pointer.intersectObjects(renderer.world.globalBlockContainer.children, true);
        if(collidingWith.length > 0) {
            this.collision.left = true;
            console.log("hit");
        }
        else this.collision.left = false;
    },
    // update position and orientation of crosshair (translucent neon disc :P)
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
    // Left click operation
    executePrimaryOps: function() {
        // if 'Ctrl' key is pressed, destroy block
        if(this.disruptState) this.destroyBlock();

        // else create new block
        else this.createBlock();
    },
    createBlock: function() {
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
    },
    destroyBlock: function() {
        if(this.currentSelectedObj) {
            renderer.destroyBlock(this.currentSelectedObj.object.id)
        }
    }
};
