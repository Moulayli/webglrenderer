/**
 * 4x4 matrix class.
 * 
 * @todo	Add multiply()
 * @todo    Add invert()
 * 
 * @class
 * @extends	Array
 * @param	{...number}	[elements=0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]	Matrix elements
 */
export class Matrix4 extends Array {
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
		let _;

		_ = e[1]; e[1] = e[4]; e[4] = _;
		_ = e[2]; e[2] = e[8]; e[8] = _;
		_ = e[3]; e[3] = e[12]; e[12] = _;
		_ = e[6]; e[6] = e[9]; e[9] = _;
		_ = e[7]; e[7] = e[13]; e[13] = _;
		_ = e[11]; e[11] = e[14]; e[14] = _;

		return this;
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
 * @param	{number}	a
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
 * @param	{number}	a
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
 * @param	{number}	a
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