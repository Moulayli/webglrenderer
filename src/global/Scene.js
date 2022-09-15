import {Color} from "../index.js";

export function Scene() {
	this.background	= new Color(0x000000);
	this.objects	= new Set();
	this.cameras	= new Set();
	this.lights		= new Set();
	this.meshes		= new Set();

	return this;
};

Scene.prototype.add = function(...objects) {
	for (const object of objects) {
		this.objects.add(object);

		switch (object.type) {
			case "camera":	this.cameras.add(object);	break;
			case "light":	this.lights.add(object);	break;
			case "mesh":	this.meshes.add(object);	break;
		}
	}

	return this;
};

Scene.prototype.remove = function(...objects) {
	for (const object of objects) {
		this.objects.delete(object);

		switch (object.type) {
			case "camera":	this.cameras.delete(object);	break;
			case "light":	this.lights.delete(object);		break;
			case "mesh":	this.meshes.delete(object);		break;
		}
	}

	return this;
};