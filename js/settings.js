"use strict";

function CSettings() {
    this.m_nWidth = 640;
    this.m_nHeight = 480;
}

CSettings.prototype = {
    init: init
}

function init() {
    this.m_nWidth = window.innerWidth;
    this.m_nHeight = window.innerHeight;
}
