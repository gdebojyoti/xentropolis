"use strict";

function CRenderer() {
    this.m_cScene = null;
    this.m_cCamera = null;
    this.m_cRenderer = null;
    this.m_cControls = null;
}

CRenderer.prototype = {
    init: init,
    render: render
}

function init() {
    // initialize scene
    this.m_cScene = new THREE.Scene();

    // initialize camera
    this.m_cCamera = new THREE.PerspectiveCamera(60, g_cSettings.m_nWidth/ g_cSettings.m_nHeight, 0.1, 20000);
    this.m_cCamera.position.set(0,10,0);
    this.m_cScene.add(this.m_cCamera);

    // initialize renderer
    this.m_cRenderer = new THREE.WebGLRenderer({ antialias: true });
    this.m_cRenderer.setSize(g_cSettings.width, g_cSettings.height);
    $("#playground").append(this.m_cRenderer);

    // create sample mesh
    this.m_cSampleGeom = new THREE.BoxGeometry(5,5,5);
    this.m_cSampleMat = new THREE.MeshBasicMaterial({color: 0xee5522});
    this.m_cSampleMesh = new THREE.Mesh(this.m_cSampleGeom, this.m_cSampleMat);
    this.m_cScene.add(this.m_cSampleMesh);

    // initialize orbit controls
    // this.m_cControls = new THREE.OrbitControls(this.m_cCamera, this.m_cRenderer.domElement);
}

function render() {
    var ownObject = this;
    requestAnimationFrame(this.render);

    this.m_cRenderer.render(this.m_cScene, this.m_cCamera);
    // this.m_cControls.update();
}
