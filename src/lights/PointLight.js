import {Vector3} from "../index.js";

export function PointLight(color = 0xffffff, intensity = 1) {
	Object.assign(this, {
		type: "light",
		visible: true,
		position: new Vector3(),
		color,
		intensity,
		value: new Float32Array([
			(color >> 16 & 255) / 255,
			(color >> 8 & 255) / 255,
			(color & 255) / 255,
			intensity,
		]),
	});

	return this;
};