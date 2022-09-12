import {TEXTURES} from "../index.js";

export function Texture(source) {
	Object.assign(this, {
		source,
		texture: TEXTURES.get(source),
	});

	return this;
};