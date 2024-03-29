import {Light} from "../index.js";

export class AmbientLight extends Light {
	constructor(color = 0xffffff, intensity = 1) {
		super();

		Object.assign(this, {
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