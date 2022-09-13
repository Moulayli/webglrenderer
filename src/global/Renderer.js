import {Matrix4, loadShader, parseLocations, renderMesh} from "../index.js";

export function Renderer(width, height, options) {
	options = Object.entries(options);

	this.canvas = document.createElement("canvas");
	this.canvas.textContent = "This browser does not support Canvas API.";

	// Configure WebGL context
	this.gl = this.canvas.getContext("webgl2");
	this.gl.buffer = {
		vertex: this.gl.createBuffer(),
		normal: this.gl.createBuffer(),
		index: this.gl.createBuffer(),
		uv: this.gl.createBuffer(),
	};
	this.gl.defaults = {
		color: new Float32Array([1, 1, 1, 1]),
		texture: this.gl.createTexture(),
	};

	// Create default white texture
	this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl.defaults.texture);
	this.gl.texImage2D(
		this.gl.TEXTURE_2D,
		0,
		this.gl.RGBA,
		1,
		1,
		0,
		this.gl.RGBA,
		this.gl.UNSIGNED_BYTE,
		new Uint8Array([255, 255, 255, 255]),
	);

	// WebGL options
	for (const option of options) option[1] && this.gl.enable(this.gl[option[0]]);

	this.primitiveType = this.gl.TRIANGLES;

	// Set canvas initial size
	this.stretch(width, height);

	this.locked = false;

	return this;
};

/**
 * Creates a shader program from a vertex shader and a fragment shader.
 * NOTE: This function assumes that the shaders are GLSL files located the same folder.
 * 
 * @async
 * @param	{string}	folder	Shader folder relative path
 */
Renderer.prototype.loadProgram = async function(folder) {
	const
		{gl} = this,
		vertexShader = await loadShader(gl, gl.VERTEX_SHADER, `${folder}/main.vert`),
		fragmentShader = await loadShader(gl, gl.FRAGMENT_SHADER, `${folder}/main.frag`),
		shaderProgram = gl.createProgram();

	if (vertexShader && fragmentShader) {
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) return console.error(
			"Unable to initialize the shader program ",
			gl.getProgramInfoLog(shaderProgram),
		);

		gl.shader = shaderProgram;
		parseLocations(gl, vertexShader.source);
		parseLocations(gl, fragmentShader.source);
		gl.useProgram(gl.shader);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.vertex);
		gl.enableVertexAttribArray(gl.attribute.position);
		gl.vertexAttribPointer(gl.attribute.position, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.normal);
		gl.enableVertexAttribArray(gl.attribute.normal);
		gl.vertexAttribPointer(gl.attribute.normal, 3, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.buffer.index);

		gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.uv);
		gl.enableVertexAttribArray(gl.attribute.uv);
		gl.vertexAttribPointer(gl.attribute.uv, 2, gl.FLOAT, true, 0, 0);
	}
};

Renderer.prototype.lock = function() {
	this.canvas.requestPointerLock();
};

Renderer.prototype.isLocked = function() {
	return this.canvas === document.pointerLockElement;
};

Renderer.prototype.stretch = function(width = innerWidth, height = innerHeight) {
	this.width = width;
	this.height = height;

	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.gl.viewport(0, 0, this.width, this.height);
};

Renderer.prototype.render = function(scene, camera) {
	const {gl} = this;

	gl.clearColor(...scene.background.hex1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const viewProjectionMatrix = camera.projectionMatrix
		.multiplyMatrix4(Matrix4.createTranslationMatrix(camera.distance.invert())) // Pivot point
		.multiplyMatrix4(Matrix4.createRotationMatrix(-camera.rotation.x, "x")) // X rotation
		.multiplyMatrix4(Matrix4.createRotationMatrix(camera.rotation.y, "y")) // Y rotation
		.multiplyMatrix4(Matrix4.createTranslationMatrix(camera.position.multiply(camera.lhcs))); // Translation

	// Render meshes
	for (const mesh of scene.meshes) {
		mesh.visible && renderMesh(gl, mesh, camera, this.primitiveType, viewProjectionMatrix);
	}

	// Render average light value
	let averageLightColor = [0, 0, 0, 0],
		visibleLights = 0;

	for (const light of scene.lights) {
		if (light.visible && light.intensity) {
			visibleLights++;
			averageLightColor[0] += light.value[3] * light.value[0];
			averageLightColor[1] += light.value[3] * light.value[1];
			averageLightColor[2] += light.value[3] * light.value[2];
			averageLightColor[3] += light.value[3];

			light.position && gl.uniform3fv(gl.uniform.lightWorldPos, light.position.xyz());
		}
	}

	averageLightColor = averageLightColor.map(i => i / visibleLights);
	gl.uniform4fv(gl.uniform.lightColor, averageLightColor);
};