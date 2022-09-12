import {Matrix4} from "../index.js";

export function projectOrthogonal(width, height, depth) {
	const
		w2 = 2 / width,
		h2 = 2 / height,
		d2 = 2 / depth;

	return new Matrix4([
		w2,  0,   0,   0,
		0,  -h2,  0,   0,
		0,   0,   d2,  0,
	   -1,   1,   0,   1,
	]);
};