export function Matrix4(m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
	this.data = m;

	return this;
};

Matrix4.identity = () => new Matrix4([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1,
]);

Matrix4.createTranslationMatrix = v => new Matrix4([
	1,   0,   0,   0,
	0,   1,   0,   0,
	0,   0,   1,   0,
	v.x, v.y, v.z, 1,
]);

Matrix4.createRotationMatrix = (rad, dir) => {
	const
		c = Math.cos(rad),
		s = Math.sin(rad);

	switch (dir) {
		case "x": return new Matrix4([
			1,  0,  0,  0,
			0,  c,  s,  0,
			0, -s,  c,  0,
			0,  0,  0,  1,
		]);
		case "y": return new Matrix4([
			c,  0, -s,  0,
			0,  1,  0,  0,
			s,  0,  c,  0,
			0,  0,  0,  1,
		]);
		case "z": return new Matrix4([
			c,  s,  0,  0,
		   -s,  c,  0,  0,
			0,  0,  1,  0,
			0,  0,  0,  1,
		]);
	}
};

Matrix4.createScaleMatrix = v => new Matrix4([
	v.x, 0,   0,   0,
	0,   v.y, 0,   0,
	0,   0,   v.z, 0,
	0,   0,   0,   1,
]);

Matrix4.prototype.multiplyMatrix4 = function(m) {
	const
		[a00, a10, a20, a30, a01, a11, a21, a31, a02, a12, a22, a32, a03, a13, a23, a33] = this.data,
		[b00, b10, b20, b30, b01, b11, b21, b31, b02, b12, b22, b32, b03, b13, b23, b33] = m.data;

	return new Matrix4([
		a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
		a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
		a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
		a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
		a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
		a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
		a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
		a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
		a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
		a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
		a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
		a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
		a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
		a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
		a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
		a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
	]);
};

/**
 * Returns the inverted matrix.
 * 
 * @returns	{Matrix4}
 */
Matrix4.prototype.invert = function() {
	const
		[n11, n21, n31, n41, n12, n22, n32, n42, n13, n23, n33, n43, n14, n24, n34, n44] = this.data,
		t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
		t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
		t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
		t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34,
		det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

	if (0 === det) return new Matrix4();

	const d = 1 / det;

	return new Matrix4([
		t11 * d,
		(n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * d,
		(n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * d,
		(n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * d,
		t12 * d,
		(n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * d,
		(n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * d,
		(n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * d,
		t13 * d,
		(n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * d,
		(n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * d,
		(n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * d,
		t14 * d,
		(n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * d,
		(n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * d,
		(n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * d,
	]);
};

/**
 * Returns the transposed matrix.
 * The transposition is the swapping of the rows and columns inside a matrix.
 * 
 * @returns	{Matrix4}
 */
Matrix4.prototype.transpose = function() {
	const m = this.data;

	return new Matrix4([
		m[0],  m[4],  m[8],  m[12],
		m[1],  m[5],  m[9],  m[13],
		m[2],  m[6],  m[10], m[14],
		m[3],  m[7],  m[11], m[15],
	]);
};