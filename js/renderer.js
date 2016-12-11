"use strict";

function CRenderer() {
    this.m_cScene = null;
    this.m_cCamera = null;
    this.m_cRenderer = null;
    this.m_cControls = null;
    this.m_rFOV = 60;
}

CRenderer.prototype = {
    init: function() {
        // initialize scene
        this.m_cScene = new THREE.Scene();

        // initialize camera
        this.m_cCamera = new THREE.PerspectiveCamera(this.m_rFOV, g_cSettings.m_nWidth/ g_cSettings.m_nHeight, 5, 10000);
        this.m_cCamera.position.set(0,10,10);
        // this.m_cCamera.lookAt(this.m_cScene.position);
        this.m_cCamera.rotation.x = - 45 * Math.PI / 180;
        this.m_cScene.add(this.m_cCamera);

        // initialize renderer
        this.m_cRenderer = new THREE.WebGLRenderer({ canvas: g_htmlCanvas, alpha: true });
        this.m_cRenderer.setSize(g_cSettings.m_nWidth, g_cSettings.m_nHeight);

        // this.m_cRenderer.setClearColor(0xFF2299, 1);

        // add ambient light to scene
        var light = new THREE.AmbientLight(0xFFFFFF);
        this.m_cScene.add(light);

        // create sample mesh
        this.m_cSampleGeom = new THREE.BoxGeometry(5,5,5);
        this.m_cSampleMat = new THREE.MeshBasicMaterial({color: 0xee5522});
        this.m_cSampleMesh = new THREE.Mesh(this.m_cSampleGeom, this.m_cSampleMat);
        this.m_cScene.add(this.m_cSampleMesh);

        // first person controls
        // this.m_cControls = new THREE.PointerLockControls( this.m_cCamera );
		// this.m_cScene.add( this.m_cControls.getObject() );
    },
    displayScene: function() {
        this.m_cRenderer.clear();
        this.m_cRenderer.render(this.m_cScene, this.m_cCamera);
    },
    updateScene: function() {
        this.m_cCamera.aspect = g_cSettings.m_nWidth/ g_cSettings.m_nHeight;
        this.m_cCamera.updateProjectionMatrix();
        this.m_cRenderer.setSize(g_cSettings.m_nWidth, g_cSettings.m_nHeight);
    }
}
