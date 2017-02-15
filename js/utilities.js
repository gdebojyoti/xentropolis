"use strict";

function registerEvents() {
    // Viewport events
    window.addEventListener('resize', onresize);

    // Keyboard events
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    // Mouse pointer lock events
    document.addEventListener('pointerlockchange', onpointerlockchange, false);
    document.addEventListener('mozpointerlockchange', onpointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', onpointerlockchange, false);
}

function onresize() {
    settings.width = window.innerWidth;
    settings.height = window.innerHeight;

    htmlCanvas.width = settings.width;
    htmlCanvas.height = settings.height;

    renderer.updateScene();
}

function onpointerlockchange() {
    console.log("Pointer Lock Changed!");

    var element = document.body;

    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
        player.controls.enabled = true;
    }
    else {
        player.controls.enabled = false;
    }
}

function onKeyDown(event) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            player.movement.forward = true;
            break;

        case 37: // left
        case 65: // a
            player.movement.left = true;
            break;

        case 40: // down
        case 83: // s
            player.movement.backward = true;
            break;

        case 39: // right
        case 68: // d
            player.movement.right = true;
            break;

        case 32: // space
            if (player.movement.canJump === true) player.speed.y += 350;
            player.movement.canJump = false;
            break;

        case 17: // ctrl
            player.disruptState = true;
            break;
    }
}

function onKeyUp(event) {
    switch( event.keyCode ) {
        case 38: // up
        case 87: // w
            player.movement.forward = false;
            break;

        case 37: // left
        case 65: // a
            player.movement.left = false;
            break;

        case 40: // down
        case 83: // s
            player.movement.backward = false;
            break;

        case 39: // right
        case 68: // d
            player.movement.right = false;
            break;

        case 17: // ctrl
            player.disruptState = false;
    }
}

// get screen coordinates of 3d points, create on-screen markers for them
function updateUiMarkers() {
    var vector = new THREE.Vector3();
    // TODO: Parameterize positions of 3d points
    vector.set(
        renderer.world.globalBlockContainer.children[0].position.x,
        renderer.world.globalBlockContainer.children[0].position.y,
        renderer.world.globalBlockContainer.children[0].position.z
    );

    // map to normalized device coordinate (NDC) space
    vector.project( renderer.camera );

    // map to 2D screen space
    vector.x = Math.round( (   vector.x + 1 ) * htmlCanvas.width  / 2 );
    vector.y = Math.round( ( - vector.y + 1 ) * htmlCanvas.height / 2 );
    vector.z = 0;

    $("[id=marker]").css({
        'transform': "translate(" + vector.x + "px," + vector.y + "px)"
    });
}
