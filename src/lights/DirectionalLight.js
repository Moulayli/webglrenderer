import {Light, Vector3} from "../index.js";

export class DirectionalLight extends Light {
	constructor(color = 0xffffff, intensity = 1) {
		super();

		Object.assign(this, {
			direction: new Vector3(0, 1, 0),
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