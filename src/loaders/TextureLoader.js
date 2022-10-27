import {TEXTURES, TEXTURE_PATH} from "../index.js";

/**
 * Utility class for asynchronous texture loading and preparing.
 * 
 * @constructor
 */
export function TextureLoader() {
	/**
	 * Loads the given sources into actual images.
	 * 
	 * @async
	 * @param	{WebGL2RenderingContext}	gl		WebGL context
	 * @param	{array}						sources	Sources to load
	 */
	this.load = async function(gl, sources) {
		const now = performance.now();
		let image, texture;

		// Remove duplicate sources
		sources = new Set(sources);

		for (const source of sources) {
			texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				1,
				1,
				0,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				new Uint8Array([1, 1, 1, 1]),
			);

			try {
				image = await load(image, source);
			} catch (error) {
				continue;
			}

			console.log(`%c${source} loaded`, "color: #777; font-style: italic");

			setTexParameteri(gl, "norepeat");
			setTexParameteri(gl, "pixelated");

			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				image,
			);
			gl.generateMipmap(gl.TEXTURE_2D);

			TEXTURES.set(source, texture);
		}

		console.log(`%cLoading finished (took ${((performance.now() - now) / 1000).toFixed(2)}s)`, "color: #6cbf6c");
	}
};

/**
 * Loads an image asynchronously and returns it.
 * 
 * @async
 * @param	{Image}		image	Image element
 * @param	{string}	source	Image path
 * @return	{Image}
 */
async function load(image, source) {
	image = new Image();
	image.src = TEXTURE_PATH + source;

	await image.decode();

	return image;
}

/**
 * Applies a texture parameter to the current TEXTURE_2D.
 * 
 * @param	{WebGL2RenderingContext}	gl		WebGL context
 * @param	{string}					param	Parameter name
 */
function setTexParameteri(gl, param) {
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

	switch (param) {
		case "norepeat":
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

			break;
		case "pixelated":
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

			break;
	}
}