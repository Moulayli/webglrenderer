export function clamp(n, min, max) {
	n < min && (n = min);
	n > max && (n = max);

	return n;
};