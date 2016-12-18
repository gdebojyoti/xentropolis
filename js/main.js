"use strict";

var htmlCanvas = null;
var renderer = null;
var settings = null;
var player = null;

var prevTime, currTime;

$(function() {
    htmlCanvas = document.getElementById("playground");

    settings = new CSettings();
    settings.init();

    player = new CPlayer();
    player.init();

    renderer = new CRenderer();
    renderer.init();

    registerEvents();
    onresize();

    // lock the pointer - invoke requestPointerLock API
    $("#button").on("click", function(e) {
        lockPointer();
        e.stopPropagation();
    });

    // Click to create new block
    $("body").on("click", function() {
        player.createBlock();
    });

    // Right click function - pending implementation
    // TODO: Capture right click event when pointer is locked
    $("body").on("contextmenu", function(evt) {
        // console.log("Right click");
        return false;
    });

    renderLoop();
})

function renderLoop() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(renderLoop);

    var time = performance.now();
    var deltaTime = ( time - prevTime ) / 1000;

    // Render the scene
    renderer.displayScene(deltaTime);

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

        player.controls.enabled = true;

        // Ask the browser to release the pointer
        // document.exitPointerLock = document.exitPointerLock ||
        // 			   document.mozExitPointerLock ||
        // 			   document.webkitExitPointerLock;
        // document.exitPointerLock();
    } else {
        alert("Your browser doesn't seem to support Pointer Lock API");
    }
}
