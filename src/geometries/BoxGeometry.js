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
		// Vertices go from top left to bottom right
		vertices: new Float32Array([
			1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0, // front
   1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0, // right
   1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0, // up
  -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0, // left
  -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0, // down
   1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0  // back
		]),
		normals: new Float32Array([
			// Front
			0,  0,  1,
			0,  0,  1,
			0,  0,  1,
			0,  0,  1,
			// Right
			// Back
			// Left
			// Top
			// Bottom
			/*1,  0,  0,			1,  0,  0,			1,  0,  0,			1,  0,  0,
			0,  1,  0,			0,  1,  0,			0,  1,  0,			0,  1,  0,
		   -1,  0,  0,		   -1,  0,  0,		   -1,  0,  0,		   -1,  0,  0,
			0, -1,  0,			0, -1,  0,			0, -1,  0,			0, -1,  0,
			0,  0, -1,			0,  0, -1,			0,  0, -1,			0,  0, -1,*/
		]),
		// Counterclockwise
		indices: new Uint16Array([
			 0, 1, 2,   0, 2, 3,  // front
  4, 5, 6,   4, 6, 7,  // right
  8, 9, 10,  8, 10,11, // up
  12,13,14,  12,14,15, // left
  16,17,18,  16,18,19, // down
  20,21,22,  20,22,23  // back
		]),
	});

	return this;
};