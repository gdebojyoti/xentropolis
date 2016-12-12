"use strict";

function CRenderer() {
    this.m_cScene = null;
    this.m_cCamera = null;
    this.m_cRenderer = null;
    this.m_cControls = null;
    this.m_cPlayer = null;
    this.m_rFOV = 60;
}

CRenderer.prototype = {
    init: function() {
        // initialize scene
        this.m_cScene = new THREE.Scene();
        // this.m_cScene.fog = new THREE.Fog( 0x555555, 0, 200 );

        // initialize camera
        this.m_cCamera = new THREE.PerspectiveCamera(this.m_rFOV, g_cSettings.m_nWidth/ g_cSettings.m_nHeight, 5, 10000);

        // initialize renderer
        this.m_cRenderer = new THREE.WebGLRenderer({ canvas: g_htmlCanvas, alpha: true });
        this.m_cRenderer.setSize(g_cSettings.m_nWidth, g_cSettings.m_nHeight);

        // this.m_cRenderer.setClearColor(0xFF2299, 1);

        // add ambient light to scene
        var light = new THREE.AmbientLight(0xFFFFFF);
        this.m_cScene.add(light);

        // sample plane
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200,5), new THREE.MeshBasicMaterial({color: 0xee5522}));
        plane.position.y = 0;
        plane.rotation.x = - 90 * Math.PI / 180;
        this.m_cScene.add(plane);

        // sample cube
        var cube = new THREE.Mesh(new THREE.BoxGeometry(5,5,5), new THREE.MeshBasicMaterial({
                color: 0xff0033,
                wireframe: true
            }));
        cube.position.y = 0;
        cube.position.z = -50;
        this.m_cScene.add(cube);

        // first person controls
        this.m_cControls = new THREE.PointerLockControls( this.m_cCamera );
        g_cPlayer.m_cPlayer = this.m_cControls.getObject();
		this.m_cScene.add(g_cPlayer.m_cPlayer);
    },
    displayScene: function(deltaTime) {
        this.m_cRenderer.clear();
        this.m_cRenderer.render(this.m_cScene, this.m_cCamera);

        // g_cPlayer.m_cDirectionRay.ray.origin.copy( g_cPlayer.m_cPlayer.position );
		// g_cPlayer.m_cDirectionRay.ray.origin.y -= 10;

        // var intersections = g_cPlayer.m_cDirectionRay.intersectObjects( objects );
		// var isOnObject = intersections.length > 0;

        if(!isNaN(deltaTime)) {
            g_cPlayer.m_cSpeed.x -= g_cPlayer.m_cSpeed.x * 10.0 * deltaTime;
            g_cPlayer.m_cSpeed.z -= g_cPlayer.m_cSpeed.z * 10.0 * deltaTime;

            // g_cPlayer.m_cSpeed.y -= 9.8 * 100.0 * deltaTime; // 100.0 = mass

            if ( g_cPlayer.m_cMovement.forward ) g_cPlayer.m_cSpeed.z -= 400.0 * deltaTime;
            if ( g_cPlayer.m_cMovement.backward ) g_cPlayer.m_cSpeed.z += 400.0 * deltaTime;

            if ( g_cPlayer.m_cMovement.left ) g_cPlayer.m_cSpeed.x -= 400.0 * deltaTime;
            if ( g_cPlayer.m_cMovement.right ) g_cPlayer.m_cSpeed.x += 400.0 * deltaTime;

            // if ( isOnObject === true ) {
            //     g_cPlayer.m_cSpeed.y = Math.max( 0, g_cPlayer.m_cSpeed.y );
            //
            //     canJump = true;
            // }

            g_cPlayer.m_cPlayer.translateX( g_cPlayer.m_cSpeed.x * deltaTime );
            // g_cPlayer.m_cPlayer.translateY( g_cPlayer.m_cSpeed.y * deltaTime );
            g_cPlayer.m_cPlayer.translateZ( g_cPlayer.m_cSpeed.z * deltaTime );
        }

        if ( g_cPlayer.m_cPlayer.position.y < 10 ) {

            g_cPlayer.m_cSpeed.y = 0;
            g_cPlayer.m_cPlayer.position.y = 10;

            g_cPlayer.m_cMovement.canJump = true;

        }
    },
    updateScene: function() {
        this.m_cCamera.aspect = g_cSettings.m_nWidth/ g_cSettings.m_nHeight;
        this.m_cCamera.updateProjectionMatrix();
        this.m_cRenderer.setSize(g_cSettings.m_nWidth, g_cSettings.m_nHeight);
    }
}
