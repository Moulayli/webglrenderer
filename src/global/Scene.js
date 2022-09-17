import {Camera, Color, Light} from "../index.js";

export function Scene({background = new Color(0x000000), fogColor = new Color(0xaaaaaa), fogAmount = 0} = {}) {
	Object.assign(this, {
		background,
		fogColor,
		fogAmount,
		objects: new Set(),
		cameras: new Set(),
		lights: new Set(),
		meshes: new Set(),
	});

	return this;
};

Scene.prototype.add = function(...objects) {
	for (const object of objects) {
		switch (true) {
			case object instanceof Camera:
				this.cameras.add(object);

				break;
			case object instanceof Light:
				this.lights.add(object);

				break;
			case object.type === "mesh":
				this.meshes.add(object);

				break;
		}

		this.objects.add(object);
	}

	return this;
};

Scene.prototype.remove = function(...objects) {
	for (const object of objects) {
		switch (true) {
			case object instanceof Camera:
				this.cameras.delete(object);

				break;
			case object instanceof Light:
				this.lights.delete(object);

				break;
			case object.type === "mesh":
				this.meshes.delete(object);

				break;
		}

		this.objects.delete(object);
	}

	return this;
};