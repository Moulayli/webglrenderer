export function BoxGeometry(width = 1, height = width, depth = width) {
	const w = width / 2, h = height / 2, d = depth / 2;

	Object.assign(this, {
		type: "box",
		width,
		height,
		depth,
		vertices: new Float32Array([
			// Front
		   -w,  h,  d,
			w,  h,  d,
		   -w, -h,  d,
			w, -h,  d,
			// Back
			w,  h, -d,
		   -w,  h, -d,
			w, -h, -d,
		   -w, -h, -d,
			// Left
		   -w,  h, -d,
		   -w,  h,  d,
		   -w, -h, -d,
		   -w, -h,  d,
			// Right
			w,  h,  d,
			w,  h, -d,
			w, -h,  d,
			w, -h, -d,
			// Top
		   -w,  h, -d,
			w,  h, -d,
		   -w,  h,  d,
			w,  h,  d,
			// Bottom
			w, -h, -d,
		   -w, -h, -d,
			w, -h,  d,
		   -w, -h,  d,
		]),
		normals: new Float32Array([
			0,  0,  1,			0,  0,  1,			0,  0,  1,			0,  0,  1,		// Front
			0,  0, -1,			0,  0, -1,			0,  0, -1,			0,  0, -1,		// Back
		   -1,  0,  0,		   -1,  0,  0,		   -1,  0,  0,		   -1,  0,  0,		// Left
			1,  0,  0,			1,  0,  0,			1,  0,  0,			1,  0,  0,		// Right
			0,  1,  0,			0,  1,  0,			0,  1,  0,			0,  1,  0,		// Top
			0, -1,  0,			0, -1,  0,			0, -1,  0,			0, -1,  0,		// Bottom
		]),
		indices: new Uint16Array([
			// Front
			0,  2,  1,
			2,  3,  1,
			// Back
			8,  10, 9,
			10, 11, 9,
			// Left
			12, 14, 13,
			14, 15, 13,
			// Right
			4,  6,  5,
			6,  7,  5,
			// Top
			16, 18, 17,
			18, 19, 17,
			// Bottom
			20, 22, 21,
			22, 23, 21,
		]),
	});

	return this;
};