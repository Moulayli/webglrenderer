import {SENSITIVITY_X, SENSITIVITY_Y, Matrix4, Vector3} from "../index.js";

export function PerspectiveCamera(fov = 60, aspect = innerWidth / innerHeight, near = 1, far = 1000) {
	Object.assign(this, {
		type: "camera",
		fov,
		aspect,
		near,
		far,
		position: new Vector3(),
		rotation: new Vector3(),
		distance: new Vector3(), // For third-person view
		up: new Vector3(0, 1, 0),
		// Convert the client left-hand coordinate system (increase forward, decrease backward)
		// to a valid WebGL right-hand coordinate system (decrease forward, increase backward)
		lhcs: new Vector3(-1, -1, 1),
	});

	this.lookAround = e => {
		const
			x = -e.movementY * SENSITIVITY_Y / 1000,
			y = e.movementX * SENSITIVITY_X / 1000;

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && this.rotation.x >= -Math.PI / 2 ||
			x > 0 && this.rotation.x <= Math.PI / 2
		) this.rotation.x += x;

		this.rotation.y += y;
	};

	// this.meshes = new Set();

	this.updateProjectionMatrix();

	return this;
};

PerspectiveCamera.prototype.moveForward = function(n) {
	const direction = new Vector3(
		Math.sin(this.rotation.y),
		0,
		Math.cos(this.rotation.y),
	);

	this.position = this.position.add(direction.multiplyScalar(n));

	/*for (const mesh of this.meshes) {
		mesh.position.set(this.position);
	}*/
};

PerspectiveCamera.prototype.moveRight = function(n) {
	const direction = new Vector3(
		Math.cos(this.rotation.y),
		0,
		-Math.sin(this.rotation.y),
	);

	this.position = this.position.add(direction.multiplyScalar(n));

	/*for (const mesh of this.meshes) {
		mesh.position.set(this.position);
	}*/
};

PerspectiveCamera.prototype.moveUp = function(n) {
	this.position.y += n;
};

PerspectiveCamera.prototype.updateProjectionMatrix = function() {
	const
		{fov, near, far, aspect} = this,
		f = Math.tan(Math.PI * .5 - .5 * fov * Math.PI / 180),	
		range = 1 / (near - far);

	this.projectionMatrix = new Matrix4([
		f / aspect, 0, 0, 0,
		0, f, 0, 0,
		0, 0, (near + far) * range, -1,
		0, 0, near * far * range * 2, 0,
	]);
};

PerspectiveCamera.prototype.lookAt = function(pos, target) {
	const
		az = pos.clone().substract(target).normalize(),
		ax = this.up.cross(az).normalize(),
		ay = az.clone().cross(ax).clone().normalize();

	return new Matrix4([
		ax.x,  ax.y,  ax.z,  0,
		ay.x,  ay.y,  ay.z,  0,
		az.x,  az.y,  az.z,  0,
		pos.x, pos.y, pos.z, 1,
	]);
};

/*PerspectiveCamera.prototype.attach = function(...meshes) {
	for (const mesh of meshes) this.meshes.add(mesh);
};*/

/*PerspectiveCamera.prototype.detach = function(...meshes) {
	for (const mesh of meshes) this.meshes.delete(mesh);
};*/