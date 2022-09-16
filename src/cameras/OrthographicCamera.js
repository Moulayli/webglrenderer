import {SENSITIVITY_X, SENSITIVITY_Y, Camera, Matrix4, Vector3} from "../index.js";

export class OrthographicCamera extends Camera {
	constructor(width, height, depth) {
		super();

		Object.assign(this, {
			width,
			height,
			depth,
			position: new Vector3(),
			rotation: new Vector3(),
			distance: new Vector3(), // For third-person view,
			up: new Vector3(0, 1, 0),
			// Convert the client left-hand coordinate system (increase forward, decrease backward)
			// to a valid WebGL right-hand coordinate system (decrease forward, increase backward)
			lhcs: new Vector3(-1, -1, 1),
		});

		this.updateProjectionMatrix();
	}

	lookAround(e) {
		const
			x = e.movementY * SENSITIVITY_Y / 1000,
			y = e.movementX * SENSITIVITY_X / 1000;

		// Prevent < -180° or > 180° rotation along the X axis
		if (
			x < 0 && this.rotation.x >= -Math.PI / 2 ||
			x > 0 && this.rotation.x <= Math.PI / 2
		) this.rotation.x += x;

		this.rotation.y += y;
	}

	moveForward(n) {
		const direction = new Vector3(
			Math.sin(this.rotation.y),
			0,
			Math.cos(this.rotation.y),
		);

		this.position = this.position.add(direction.multiplyScalar(n));
	}

	moveRight(n) {
		const direction = new Vector3(
			Math.cos(this.rotation.y),
			0,
			-Math.sin(this.rotation.y),
		);

		this.position = this.position.add(direction.multiplyScalar(n));
	}

	moveUp(n) {
		this.position.y += n;
	}

	updateProjectionMatrix() {
		const
			w2 = 2 / this.width,
			h2 = 2 / this.height,
			d2 = 2 / this.depth;

		this.projectionMatrix = new Matrix4([
			w2,  0,   0,   0,
			0,  -h2,  0,   0,
			0,   0,   d2,  0,
		   -1,   1,   0,   1,
		]);
	}
};