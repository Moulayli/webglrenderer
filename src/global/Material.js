export function Material({color, texture}) {
	Object.assign(this, {
		type: color ?
			"color" :
			texture ?
				"texture" :
				"material",
		color,
		texture,
	});

	return this;
};