export function AmbientLight(color = 0xffffff, intensity = 1) {
	Object.assign(this, {
		type: "light",
		visible: true,
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