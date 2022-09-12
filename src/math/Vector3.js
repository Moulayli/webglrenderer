/**
 * Creates a 3-dimensional vector.
 * 
 * @constructor
 * @param	{number}	x
 * @param	{number}	y
 * @param	{number}	z
 * @returns	{Vector3}
 */
export function Vector3(x, y, z) {
	return this.set(x, y, z);
};

/**
 * Adds another vector to this vector.
 * 
 * @param	{Vector3}	v
 * @returns	{Vector3}
 */
Vector3.prototype.add = function(v) {
	return new Vector3(
		this.x + v.x,
		this.y + v.y,
		this.z + v.z,
	);
};

/**
 * Adds a given scalar value to this vector's coordinates.
 * 
 * @param	{number}	n
 * @returns	{Vector3}
 */
Vector3.prototype.addScalar = function(n) {
	return new Vector3(
		this.x + n,
		this.y + n,
		this.z + n,
	);
};

/**
 * Adds the multiple of a given scalar value and a given vector to this vector.
 * 
 * @param	{Vector3}	v
 * @param	{number}	n
 * @returns	{Vector3}
 */
Vector3.prototype.addScaledVector = function(v, n) {
	return this.add(v.multiplyScalar(n));
};

/**
 * Return the angle between this vector and another vector.
 * 
 * @param	{Vector3}	v 
 * @returns	{number}
 */
Vector3.prototype.angleTo = function(v) {
	const d = Math.sqrt(this.lengthSquared + v.lengthSquared());

	if (d === 0) return Math.PI / 2;

	const theta = this.dot(v) / denominator;

	return Math.acos(theta);
};

/**
 * Rounds up the position of this vector to the nearest integer value.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.ceil = function() {
	return new Vector3(
		Math.ceil(this.x),
		Math.ceil(this.y),
		Math.ceil(this.z),
	);
};

/**
 * Returns a copy of this vector.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.clone = function() {
	return new Vector3(this.x, this.y, this.z);
};

/**
 * Calculates the cross product of this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{Vector3}
 */
Vector3.prototype.cross = function(v) {
	return new Vector3(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x,
	);
};

/**
 * Returns the distance between this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{number}
 */
Vector3.prototype.distanceTo = function(v) {
	return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2 + (v.z - this.z) ** 2);
};

/**
 * Divides this vector by another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{Vector3}
 */
Vector3.prototype.divide = function(v) {
	return new Vector3(
		this.x / v.x,
		this.y / v.y,
		this.z / v.z,
	);
};

/**
 * Divides this vector by a given scalar value.
 * 
 * @param	{number}	n
 * @returns	{Vector3}
 */
Vector3.prototype.divideScalar = function(n) {
	return this.multiplyScalar(1 / n);
};

/**
 * Calculates the dot product of this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{number}
 */
Vector3.prototype.dot = function(v) {
	return this.x * v.x + this.y * v.y + this.z * v.z;
};

/**
 * Returns the boolean value of the comparison of this vector and another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{boolean}
 */
Vector3.prototype.equals = function(v) {
	return this.x === v.x && this.y === v.y && this.z === v.z;
};

/**
 * Rounds down the position of this vector to the nearest integer value.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.floor = function() {
	return new Vector3(
		Math.floor(this.x),
		Math.floor(this.y),
		Math.floor(this.z),
	);
};

/**
 * Inverts the coordinate signs of this vector.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.invert = function() {
	return this.multiplyScalar(-1);
};

/**
 * Returns the length of the line going from the origin to the position of this vector.
 * 
 * @returns	{number}
 */
Vector3.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
};

/**
 * Returns the squared length of the line going from the origin to the position of this vector.
 * 
 * @returns	{number}
 */
Vector3.prototype.lengthSquared = function() {
	return this.x ** 2 + this.y ** 2 + this.z ** 2;
};

/**
 * Multiplies this vector by another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{Vector3}
 */
Vector3.prototype.multiply = function(v) {
	return new Vector3(
		this.x * v.x,
		this.y * v.y,
		this.z * v.z,
	);
};

/**
 * Multiplies this vector by a given scalar value.
 * 
 * @param	{number}	n
 * @returns	{Vector3}
 */
Vector3.prototype.multiplyScalar = function(n) {
	return new Vector3(
		this.x * n,
		this.y * n,
		this.z * n,
	);
};

/**
 * Normalizes this vector.
 * 
 * @returns {Vector3}
 */
Vector3.prototype.normalize = function() {
	const length = this.length();

	if (length > .00001) return new Vector3(
		this.x / length,
		this.y / length,
		this.z / length,
	);

	return new Vector3();
};

/**
 * Sets pseudo-random coordinates between 0 and 1 (excluded) to this vector.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.randomize = function() {
	return new Vector3(
		Math.random(),
		Math.random(),
		Math.random(),
	);
};

/**
 * Rounds the position of this vector to the nearest integer value.
 * 
 * @returns	{Vector3}
 */
Vector3.prototype.round = function() {
	return new Vector3(
		Math.round(this.x),
		Math.round(this.y),
		Math.round(this.z),
	);
};

/**
 * Sets the coordinates of this vector.
 * 
 * @param	{number}	[x=0]
 * @param	{number}	[y=x]
 * @param	{number}	[z=x]
 * @returns	{self}
 */
Vector3.prototype.set = function(x = 0, y, z) {
	if (x instanceof Vector3) {
		this.x = x.x;
		this.y = x.y;
		this.z = x.z;

		return this;
	}

	if (y === undefined && z === undefined) {
		this.x = x;
		this.y = x;
		this.z = x;

		return this;
	}

	this.x = x;
	this.y = y;
	this.z = z;

	return this;
};

/**
 * Sets the X coordinate of this vector.
 * 
 * @param	{number}	x
 * @returns	{self}
 */
Vector3.prototype.setX = function(x) {
	this.x = x;

	return this;
};

/**
 * Sets the Y coordinate of this vector.
 * 
 * @param	{number}	y
 * @returns	{self}
 */
Vector3.prototype.setY = function(y) {
	this.y = y;

	return this;
};

/**
 * Sets the Z coordinate of this vector.
 * 
 * @param	{number}	z
 * @returns	{self}
 */
Vector3.prototype.setZ = function(z) {
	this.z = z;

	return this;
};

/**
 * Substracts this vector from another vector.
 * 
 * @param	{Vector3}	v
 * @returns	{Vector3}
 */
Vector3.prototype.substract = function(v) {
	return new Vector3(
		this.x - v.x,
		this.y - v.y,
		this.z - v.z,
	);
};

/**
 * Substracts this vector from a given scalar value.
 * 
 * @param	{number}	n
 * @returns	{Vector3}
 */
Vector3.prototype.substractScalar = function(n) {
	return this.addScalar(-n);
};

/**
 * Returns the coordinates of this vector in an array.
 * 
 * @returns	{array}
 */
Vector3.prototype.toArray = function() {
	return [this.x, this.y, this.z];
};

/**
 * Returns the coordinates of this vector in a string.
 * 
 * @param	{number}	n	Decimal rounding
 * @returns	{string}
 */
Vector3.prototype.toString = function(n = 2) {
	return `${this.x.toFixed(n)} ${this.y.toFixed(n)} ${this.z.toFixed(n)}`;
};

/**
 * Returns the spreaded vector.
 * 
 * @returns	{...number}
 */
 Vector3.prototype.xyz = function() {
	return [this.x, this.y, this.z];
};