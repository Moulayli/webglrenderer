export const Color = function(color) {
	this.color = color;

	this.hex = [
		(this.color >> 16 & 255),
		(this.color >> 8 & 255),
		(this.color & 255),
	];

	this.hex1 = [
		(this.color >> 16 & 255) / 255,
		(this.color >> 8 & 255) / 255,
		(this.color & 255) / 255,
		1,
	];

	this.rgb = `rgb(${this.hex.join()})`;
	this.hexadecimal = () => {
		const hex = this.hex
			.map(h => h.toString(16))
			.map(h => h.length == 1 ? "0" + h : h);

		return `#${hex.join("")}`;
	};

	return this;
};