"use strict";

function CRenderer() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.player = null;
    this.world = null;
    this.m_rFOV = 60;
}

CRenderer.prototype = {
    init: function() {
        // initialize scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog( 0xcce0ff, 0, 200 );

        // initialize camera
        this.camera = new THREE.PerspectiveCamera(this.m_rFOV, settings.width/ settings.height, 0.1, 10000);

        // initialize renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: htmlCanvas, alpha: true });
        this.renderer.setSize(settings.width, settings.height);

        // add ambient light to scene
        this.scene.add( new THREE.AmbientLight( 0x666666 ) );

        var light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
		light.position.set( 50, 200, 100 );
		light.position.multiplyScalar( 1.3 );

		light.castShadow = true;

		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;

		var d = 300;

		light.shadow.camera.left = - d;
		light.shadow.camera.right = d;
		light.shadow.camera.top = d;
		light.shadow.camera.bottom = - d;

		light.shadow.camera.far = 1000;

        this.scene.add(light);

        this.world = new World();
        this.world.init();

        player.setup();
        this.scene.add(player.player);
    },
    displayScene: function(deltaTime) {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);

        player.displayView();
        player.checkForCollisions();

        // player.directionRay.ray.origin.copy( player.player.position );
		// player.directionRay.ray.origin.y -= 10;

        // var intersections = player.directionRay.intersectObjects( objects );
		// var isOnObject = intersections.length > 0;

        if(!isNaN(deltaTime)) {
            player.speed.x -= player.speed.x * 10.0 * deltaTime;
            player.speed.z -= player.speed.z * 10.0 * deltaTime;

            // player.speed.y -= 9.8 * 100.0 * deltaTime; // 100.0 = mass

            if ( player.movement.forward ) player.speed.z -= 400.0 * deltaTime;
            if ( player.movement.backward ) player.speed.z += 400.0 * deltaTime;

            if ( player.movement.left) player.speed.x -= 400.0 * deltaTime;
            if ( player.movement.right ) player.speed.x += 400.0 * deltaTime;

            // Block movement (set speed to 0) on collision detection
            if ( player.collision.forward && player.speed.z < 0 ) player.speed.z = 0;
            if ( player.collision.left && player.speed.x < 0 ) player.speed.x = 0;
            if ( player.collision.right && player.speed.x > 0 ) player.speed.x = 0;

            // if ( isOnObject === true ) {
            //     player.speed.y = Math.max( 0, player.speed.y );
            //
            //     canJump = true;
            // }

            player.player.translateX( player.speed.x * deltaTime );
            // player.player.translateY( player.speed.y * deltaTime );
            player.player.translateZ( player.speed.z * deltaTime );
        }

        if ( player.player.position.y < 10 ) {

            player.speed.y = 0;
            player.player.position.y = 10;

            player.movement.canJump = true;

        }
    },
    updateScene: function() {
        this.camera.aspect = settings.width/ settings.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(settings.width, settings.height);
    },
    destroyBlock: function(id) {
        this.world.destroyBlock(id);
    }
};
