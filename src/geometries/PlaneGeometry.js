export function PlaneGeometry(width = 1, height = width) {
	const w = width / 2, h = height / 2;

	Object.assign(this, {
		type: "plane",
		width,
		height,
		vertices: new Float32Array([
		   -w, 0, -h,
			w, 0, -h,
		   -w, 0,  h,
			w, 0,  h,
		]),
		normals: new Float32Array([
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
		]),
		indices: new Uint16Array([
			0, 2, 1,
			2, 3, 1,
		]),
	});

	return this;
};