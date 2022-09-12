export function PlaneGeometry(width = 1, height = width) {
	const
		w2 = width / 2,
		h2 = height / 2;

	Object.assign(this, {
		type: "plane",
		width,
		height,
		vertices: new Float32Array([
		   -w2, 0, -h2,
			w2, 0, -h2,
			w2, 0,  h2,
		   -w2, 0,  h2,
		]),
		normals: new Float32Array([
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
		]),
		indices: new Uint16Array([
			0, 2, 1,
			2, 0, 3,
		]),
		uvs: new Float32Array([
			1, 0,
			1, 1,
			0, 1,
		]),
	});

	return this;
};