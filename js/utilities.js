"use strict";

function registerEvents() {
    window.addEventListener('resize', onresize);

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
