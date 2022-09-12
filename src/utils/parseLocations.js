/**
 * Creates references for the shader attributes and uniforms.
 * NOTE: The parser relies on the name two first characters to determine the variable type. Attributes must begin with "a_" and uniforms with "u_".
 * References are stored inside the rendering context.
 * 
 * @param	{WebGL2RenderingContext}	gl		WebGL2 context
 * @param	{WebGLShader}				source	Shader source string
 */
export function parseLocations(gl, source) {
	let {attribute, uniform} = gl, matches, token;

	attribute ??= {};
	uniform ??= {};

	// Purify the source
	{
		// Remove multiline comments
		source = source.split(/\/\*[\s\S]*\*\//).join("");

		// Remove single-line comments
		source = source.split(/\/\/.*/).join("");

		// Narrow down the search by removing the main() section
		source = source.split(/void\s+main()/)[0];
	}

	// Extract attributes
	{
		matches = source.matchAll(/\ba_.+\b/g);

		for ([token] of matches) {
			attribute[token.slice(2)] = gl.getAttribLocation(gl.shader, token);
		}
	}

	// Extract uniforms
	{
		matches = source.matchAll(/\bu_.+\b/g);

		for ([token] of matches) {
			uniform[token.slice(2)] = gl.getUniformLocation(gl.shader, token);
		}
	}

	Object.assign(gl, {attribute, uniform});
};