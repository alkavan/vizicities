/* globals window, _, VIZI, THREE, Physijs */
(function() {
	"use strict";

	VIZI.PhysicsCube = function() {
		VIZI.Log("Inititialising PhysicsCobe object");

		VIZI.Object.call(this);

		this.object = this.createObject();
	};

	VIZI.PhysicsCube.prototype = Object.create( VIZI.Object.prototype );

	VIZI.PhysicsCube.prototype.createObject = function() {

		var settings = {
			position: new THREE.Vector3(0, 0, 0),
			mass: (2 * 2 * 2),
			width:  100,
			height: 100,
			depth:  100,
			color:  0xffff00
		};

		var mesh, startTransform, localInertia, boxShape, motionState, rbInfo, boxAmmo;

		var geometry = new THREE.CubeGeometry(settings.width, settings.height, settings.depth);
		var material = new THREE.MeshBasicMaterial({
			color: settings.color,
			wireframe: false
		});

		mesh = new Physijs.BoxMesh(geometry, material);

		// Create box physics model
		startTransform = new Ammo.btTransform();
		startTransform.setIdentity();
		startTransform.setOrigin(new Ammo.btVector3( settings.position.x, settings.position.y, settings.position.z ));

		localInertia = new Ammo.btVector3(0, 0, 0);

		boxShape = new Ammo.btBoxShape(new Ammo.btVector3( settings.width+5, settings.height+5, settings.depth+5 ));
		boxShape.calculateLocalInertia( settings.mass, localInertia );

		motionState = new Ammo.btDefaultMotionState( startTransform );
		rbInfo      = new Ammo.btRigidBodyConstructionInfo( settings.mass, motionState, boxShape, localInertia );
		boxAmmo     = new Ammo.btRigidBody( rbInfo );

		boxAmmo.mesh = mesh;

		this.publish("addToScene", boxAmmo.mesh);
		console.log(boxAmmo);
		return boxAmmo;
	};
}());