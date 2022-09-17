import {Light, Vector3} from "../index.js";

export class PointLight extends Light {
	constructor(color = 0xffffff, intensity = 1) {
		super();

		Object.assign(this, {
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
	}
};