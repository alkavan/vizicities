/* globals window, _, VIZI, THREE, Physijs, Ammo */
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
			position: new THREE.Vector3( (Math.random() * 1500 - 500), 300, (Math.random() * 3000 - 800) ),
			mass: (5 * 5 * 5),
			width:  100,
			height: 100,
			depth:  100,
			color:  0xff0000
		};

		var mesh, startTransform, localInertia, boxShape, motionState, rbInfo, boxAmmo;

		var geometry = new THREE.CubeGeometry(settings.width, settings.height, settings.depth);
		var material = new THREE.MeshBasicMaterial({
			color: settings.color,
			wireframe: false
		});

		mesh = new Physijs.BoxMesh(geometry, material);
		mesh.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );

		// Create box physics model
		startTransform = new Ammo.btTransform();
		startTransform.setIdentity();
		startTransform.setOrigin(new Ammo.btVector3( settings.position.x, settings.position.y, settings.position.z ));

		localInertia = new Ammo.btVector3(0, 0, 0);

		boxShape = new Ammo.btBoxShape(new Ammo.btVector3( settings.width+3, settings.height+3, settings.depth+3 ));
		boxShape.calculateLocalInertia( settings.mass, localInertia );

		motionState = new Ammo.btDefaultMotionState( startTransform );
		rbInfo      = new Ammo.btRigidBodyConstructionInfo( settings.mass, motionState, boxShape, localInertia );
		boxAmmo     = new Ammo.btRigidBody( rbInfo );

		mesh.position = settings.position;

		boxAmmo.mesh = mesh;

		this.publish("addPhysicsToScene", boxAmmo);
		return boxAmmo;
	};
}());