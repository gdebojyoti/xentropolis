"use strict";

var g_htmlCanvas = null;
var g_cRenderer = null;
var g_cSettings = null;
var g_cPlayer = null;

var prevTime, currTime;

$(function() {
    g_htmlCanvas = document.getElementById("playground");

    g_cSettings = new CSettings();
    g_cSettings.init();

    g_cPlayer = new CPlayer();
    g_cPlayer.init();

    g_cRenderer = new CRenderer();
    g_cRenderer.init();

    registerEvents();
    onresize();

    $("#button").on("click", function() {
        lockPointer();
    });

    renderLoop();
})

function renderLoop() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(renderLoop);

    var time = performance.now();
    var deltaTime = ( time - prevTime ) / 1000;

    // Render the scene
    g_cRenderer.displayScene(deltaTime);

    prevTime = time;
}

function lockPointer() {
    var isPointerLockAvailable = 'pointerLockElement' in document ||
            'mozPointerLockElement' in document ||
            'webkitPointerLockElement' in document;

    var element = document.body;

    if(isPointerLockAvailable) {

        element.requestPointerLock = element.requestPointerLock ||
			    element.mozRequestPointerLock ||
			    element.webkitRequestPointerLock;

        // Ask the browser to lock the pointer
        element.requestPointerLock();

        g_cRenderer.m_cControls.enabled = true;

        // Ask the browser to release the pointer
        // document.exitPointerLock = document.exitPointerLock ||
        // 			   document.mozExitPointerLock ||
        // 			   document.webkitExitPointerLock;
        // document.exitPointerLock();
    } else {
        alert("Your browser doesn't seem to support Pointer Lock API");
    }
}
