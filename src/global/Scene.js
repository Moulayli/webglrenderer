import {Camera, Color} from "../index.js";

export function Scene({background = new Color(0x000000)} = {}) {
	Object.assign(this, {
		background,
		objects: new Set(),
		cameras: new Set(),
		lights: new Set(),
		meshes: new Set(),
	});

	return this;
};

Scene.prototype.add = function(...objects) {
	for (const object of objects) {
		this.objects.add(object);

		switch (object.type) {
			case "light":	this.lights.add(object);	break;
			case "mesh":	this.meshes.add(object);	break;
		}

		switch (true) {
			case object instanceof Camera:
				this.cameras.add(object);

				break;
		}
	}

	return this;
};

Scene.prototype.remove = function(...objects) {
	for (const object of objects) {
		this.objects.delete(object);

		switch (object.type) {
			case "light":	this.lights.delete(object);		break;
			case "mesh":	this.meshes.delete(object);		break;
		}

		switch (true) {
			case object instanceof Camera:
				this.cameras.delete(object);

				break;
		}
	}

	return this;
};