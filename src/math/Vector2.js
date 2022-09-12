/**
 * Creates a 2-dimensional vector.
 * 
 * @constructor
 * @param	{number}	[x=0]
 * @param	{number}	[y=0]
 * @returns	{Vector2}
 */
 export function Vector2(x = 0, y = 0) {
	return this.set(x, y);
};

/**
 * Sets the coordinates of this vector.
 * 
 * @param	{number}	x
 * @param	{number}	y
 * @returns	{self}
 */
Vector2.prototype.set = function(x, y) {
	Object.assign(this, {x, y});

	return this;
};