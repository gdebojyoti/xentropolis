"use strict";

function CSettings() {
    this.width = 640;
    this.height = 480;
}

CSettings.prototype = {
    init: function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}
