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
    g_cSettings.m_nWidth = window.innerWidth;
    g_cSettings.m_nHeight = window.innerHeight;

    g_htmlCanvas.width = g_cSettings.m_nWidth;
    g_htmlCanvas.height = g_cSettings.m_nHeight;

    g_cRenderer.updateScene();
}

function onpointerlockchange() {
    console.log("Pointer Lock Changed!");

    var element = document.body;

    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
        g_cRenderer.m_cControls.enabled = true;
    }
    else {
        g_cRenderer.m_cControls.enabled = false;
    }
}

function onKeyDown(event) {
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = true;
            break;

        case 37: // left
        case 65: // a
            moveLeft = true;
            break;

        case 40: // down
        case 83: // s
            moveBackward = true;
            break;

        case 39: // right
        case 68: // d
            moveRight = true;
            break;

        case 32: // space
            if (canJump === true) velocity.y += 350;
            canJump = false;
            break;
    }
};

function onKeyUp(event) {
    switch( event.keyCode ) {
        case 38: // up
        case 87: // w
            moveForward = false;
            break;

        case 37: // left
        case 65: // a
            moveLeft = false;
            break;

        case 40: // down
        case 83: // s
            moveBackward = false;
            break;

        case 39: // right
        case 68: // d
            moveRight = false;
            break;
    }
};
