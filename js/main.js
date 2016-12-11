"use strict";

var g_htmlCanvas = null;
var g_cRenderer = null;
var g_cSettings = null;

$(function() {
    g_htmlCanvas = document.getElementById("playground");

    g_cSettings = new CSettings();
    g_cSettings.init();

    g_cRenderer = new CRenderer();
    g_cRenderer.init();
    g_cRenderer.render();

    registerEvents();
    onresize();

    runProcessLoop();
})

function runProcessLoop() {

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(runProcessLoop);

    // Render the scene.
    g_cRenderer.render();
    // controls.update();

}
