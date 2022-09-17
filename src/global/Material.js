export function Material({color, texture, normalMap}) {
	Object.assign(this, {
		type: color ?
			"color" :
			texture ?
				"texture" :
				"material",
		color,
		texture,
		normalMap,
	});

	return this;
};