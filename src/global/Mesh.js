import {Vector2, Vector3} from "../index.js";

export const Mesh = function(geometry, material) {
	this.type = "mesh";

	this.geometry = geometry;
	this.material = material;

	this.position = new Vector3();
	this.rotation = new Vector3();
	this.scale = this.geometry.type === "plane" ? new Vector2(1, 1) : new Vector3(1);

	this.visible = true;

	return this;
};

Mesh.prototype.clone = function() {
	const mesh = new Mesh(this.geometry, this.material);

	mesh.position = this.position.clone();
	mesh.rotation = this.rotation.clone();
	mesh.scale = this.scale.clone();

	mesh.visible = this.visible;

	return mesh;
};