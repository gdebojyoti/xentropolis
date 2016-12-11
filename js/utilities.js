"use strict";

function registerEvents() {
    window.addEventListener('resize', onresize);
}

function onresize() {
    g_cSettings.m_nWidth = window.innerWidth;
    g_cSettings.m_nHeight = window.innerHeight;

    g_htmlCanvas.width = g_cSettings.m_nWidth;
    g_htmlCanvas.height = g_cSettings.m_nHeight;

    g_cRenderer.updateScene();
}
