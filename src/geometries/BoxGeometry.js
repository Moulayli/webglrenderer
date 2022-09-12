export function BoxGeometry(width = 1, height = width, depth = width) {
	const
		w2 = width / 2,
		h2 = height / 2,
		d2 = depth / 2;

	Object.assign(this, {
		type: "box",
		width,
		height,
		depth,
		vertices: new Float32Array([
			w2,  h2,  d2,	   -w2,  h2,  d2,	   -w2, -h2,  d2,		w2, -h2,  d2,
			w2,  h2,  d2,		w2, -h2,  d2,		w2, -h2, -d2,		w2,  h2, -d2,
			w2,  h2,  d2,		w2,  h2, -d2,	   -w2,  h2, -d2,	   -w2,  h2,  d2,
		   -w2,  h2,  d2,	   -w2,  h2, -d2,	   -w2, -h2, -d2,	   -w2, -h2,  d2,
		   -w2, -h2, -d2,		w2, -h2, -d2,		w2, -h2,  d2,	   -w2, -h2,  d2,
			w2, -h2, -d2,	   -w2, -h2, -d2,	   -w2,  h2, -d2,		w2,  h2, -d2,
		]),
		normals: new Float32Array([
			0,  0,  1,			0,  0,  1,			0,  0,  1,			0,  0,  1,
			1,  0,  0,			1,  0,  0,			1,  0,  0,			1,  0,  0,
			0,  1,  0,			0,  1,  0,			0,  1,  0,			0,  1,  0,
		   -1,  0,  0,		   -1,  0,  0,		   -1,  0,  0,		   -1,  0,  0,
			0, -1,  0,			0, -1,  0,			0, -1,  0,			0, -1,  0,
			0,  0, -1,			0,  0, -1,			0,  0, -1,			0,  0, -1,
		]),
		indices: new Uint16Array([
			0,  1,  2,			0,  2,  3,
			4,  5,  6,			4,  6,  7,
			8,  9,  10,			8,  10, 11,
			12, 13, 14,			12, 14, 15,
			16, 17, 18,			16, 18, 19,
			20, 21, 22,			20, 22, 23,
		]),
	});

	return this;
};