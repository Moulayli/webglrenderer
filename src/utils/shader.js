/**
 * Creates and compiles a shader.
 * 
 * @async
 * @param	{WebGL2RenderingContext}	gl		WebGL context
 * @param	{number}					type	Shader type (VERTEX_SHADER/FRAGMENT_SHADER)
 * @param	{string}					path	Shader file relative path
 * @returns	{WebGLShader}
 */
export async function loadShader(gl, type, path) {
	const
		shader = gl.createShader(type),
		source = await (await fetch(path, {headers: {"Cache-Control": "no-store"}})).text();

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	// Catch shader compilation errors before returning it
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(`${type === 35633 ? "VERTEX" : "FRAGMENT"} SHADER ${gl.getShaderInfoLog(shader)}`);

		return gl.deleteShader(shader);
	}

	shader.source = source;

	return shader;
};