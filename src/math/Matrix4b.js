/**
 * 4x4 matrix class.
 * 
 * @see		{@link https://en.wikipedia.org/wiki/Matrix_(mathematics)}
 * @class
 * @extends	Array
 * @param	{...number}	[elements]	Matrix content (filled with zeros by default)
 */
export class Matrix4 extends Array {
	constructor(...elements) {
		16 !== elements.length ?
			super(...Array(16).fill(0)) :
			super(...elements);
	}

	/**
	 * Multiplies every element of this matrix by n.
	 * 
	 * @param	{number}	n
	 * @returns	{self}
	 */
	multiplyScalar(n) {
		for (let i in this) this[i] *= n;

		return this;
	}

	/**
	 * Transposes this matrix: swaps its rows and its columns.
	 * 
	 * @see		{@link https://en.wikipedia.org/wiki/Transpose}
	 * @returns	{self}
	 */
	transpose() {
		const e = this;

		[e[1], e[4]]	= [e[4], e[1]];
		[e[2], e[8]]	= [e[8], e[2]];
		[e[3], e[12]]	= [e[12], e[3]];
		[e[6], e[9]]	= [e[9], e[6]];
		[e[7], e[13]]	= [e[13], e[7]];
		[e[11], e[14]]	= [e[14], e[11]];

		return this;
	}
}

/**
 * Creates an identity matrix.
 * 
 * @see		{@link https://en.wikipedia.org/wiki/Identity_matrix}
 * @returns	{Matrix4}
 */
Matrix4.identity = () => new Matrix4(
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1,
);

/**
 * Creates a translation matrix.
 * 
 * @see		{@link https://en.wikipedia.org/wiki/Transformation_matrix}
 * @param	{Vector3}	v	Translation vector
 * @returns	{Matrix4}
 */
Matrix4.translation = v => {
	const {x, y, z} = v;

	return new Matrix4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		x, y, z, 1,
	);
};

/**
 * Creates a rotation matrix for the X axis.
 * 
 * @see		{@link https://en.wikipedia.org/wiki/Rotation_matrix}
 * @param	{number}	a	Angle in radians
 * @returns	{Matrix4}
 */
Matrix4.rotationX = a => {
	const s = Math.sin(a), c = Math.cos(a);

	return new Matrix4(
		1,  0,  0,  0,
		0,  c,  s,  0,
		0, -s,  c,  0,
		0,  0,  0,  1,
	);
};

/**
 * Creates a rotation matrix for the Y axis.
 * 
 * @see		{@link https://en.wikipedia.org/wiki/Rotation_matrix}
 * @param	{number}	a	Angle in radians
 * @returns	{Matrix4}
 */
Matrix4.rotationY = a => {
	const s = Math.sin(a), c = Math.cos(a);

	return new Matrix4(
		c,  0, -s,  0,
		0,  1,  0,  0,
		s,  0,  c,  0,
		0,  0,  0,  1,
	);
};

/**
 * Creates a rotation matrix for the Z axis.
 * 
 * @see		{@link https://en.wikipedia.org/wiki/Rotation_matrix}
 * @param	{number}	a	Angle in radians
 * @returns	{Matrix4}
 */
Matrix4.rotationZ = a => {
	const s = Math.sin(a), c = Math.cos(a);

	return new Matrix4(
		c,  s,  0,  0,
	   -s,  c,  0,  0,
		0,  0,  1,  0,
		0,  0,  0,  1,
	);
};

/**
 * Creates a scale matrix.
 * 
 * @param	{Vector3}	v	Scale vector
 * @returns	{Matrix4}
 */
Matrix4.scale = v => {
	const {x, y, z} = v;

	return new Matrix4(
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1,
	);
};