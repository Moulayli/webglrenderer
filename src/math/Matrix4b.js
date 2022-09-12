/**
 * 4x4 matrix class.
 * 
 * @todo	Add multiply() and invert()
 * 
 * @class
 * @extends	Array
 * @param	{...number}	[elements=0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]	Matrix elements
 * @returns	{Matrix4}
 */
class Matrix4 extends Array {
	constructor(...elements) {
		16 !== elements.length ?
			super(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) :
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
	 * Transposes this matrix.
	 * Transposition is the swapping of the rows and columns of a matrix.
	 * 
	 * @returns	{Matrix4}
	 */
	transpose() {
		const e = this;

		return new Matrix4(
			e[0],  e[4],  e[8],  e[12],
			e[1],  e[5],  e[9],  e[13],
			e[2],  e[6],  e[10], e[14],
			e[3],  e[7],  e[11], e[15],
		);
	}
}

/**
 * Creates an identity matrix.
 * 
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
 * @param	{Vector3}	v
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
 * @param	{number}	theta
 * @returns	{Matrix4}
 */
Matrix4.rotationX = theta => {
	const s = Math.sin(theta), c = Math.cos(theta);

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
 * @param	{number}	theta
 * @returns	{Matrix4}
 */
Matrix4.rotationY = theta => {
	const s = Math.sin(theta), c = Math.cos(theta);

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
 * @param	{number}	theta
 * @returns	{Matrix4}
 */
Matrix4.rotationZ = theta => {
	const s = Math.sin(theta), c = Math.cos(theta);

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
 * @param	{Vector3}	v
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