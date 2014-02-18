(function() {
	"use strict";

	VIZI.Scene = function() {
		VIZI.Log("Inititialising WebGL scene");

		_.extend(this, VIZI.Mediator);

		this.scene = this.createScene();
		this.objects = [];

		// Listeners
		this.subscribe("addToScene", function(object) {
			VIZI.Log("Scene add object handler");
			VIZI.Log(object);
			this.addToScene(object);
		});
	};

	VIZI.Scene.prototype.createScene = function() {
		VIZI.Log("Creating WebGL scene");

		var scene = new Physijs.Scene();
		scene.fog = new THREE.Fog(0xffffff, 1, 40000);

		
		/**
		 * Ammo world
		 * TODO check if all needed
		 */
		VIZI.ammo = {};
		VIZI.ammo.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
		VIZI.ammo.dispatcher = new Ammo.btCollisionDispatcher( VIZI.ammo.collisionConfiguration );
		VIZI.ammo.overlappingPairCache = new Ammo.btDbvtBroadphase();
		VIZI.ammo.solver = new Ammo.btSequentialImpulseConstraintSolver();
		// Ammo Scene garvity
		scene.world = new Ammo.btDiscreteDynamicsWorld(
			VIZI.ammo.dispatcher,
			VIZI.ammo.overlappingPairCache,
			VIZI.ammo.solver,
			VIZI.ammo.collisionConfiguration
		);
		scene.world.setGravity(new Ammo.btVector3(0, -6, 0));

		return scene;
	};

	VIZI.Scene.prototype.addToScene = function(object) {
		this.scene.add(object);
		this.objects.push(object);
	};
}());