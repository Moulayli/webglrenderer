export const Material = function({texture, color}) {
	this.type = texture ?
		"texture" : color ?
			"color" :
			"material";

	this.texture = texture;
	this.color = color;

	return this;
};