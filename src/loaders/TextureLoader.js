import {TEXTURES, TEXTURE_PATH, Loader} from "../index.js";

/**
 * Utility class for loading textures asynchronously.
 * 
 * @constructor
 * @param	{boolean}	[logs=false]	Whether to display advancement logs in the console
 * @returns	{TextureLoader}
 */
export class TextureLoader extends Loader {
	constructor() {
		super();
	}

	/**
	 * Loads the given sources into actual images.
	 * 
	 * @async
	 * @param	{WebGL2RenderingContext}	gl		WebGL context
	 * @param	{array}						sources	Sources to load
	 */
	async load(gl, sources) {
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

			image = await load(source);

			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST); // Pixelated filter

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
 * @param	{string}	source	Image path
 * @returns	{Image}
 */
const load = async source => {
	const image = new Image();
	image.src = TEXTURE_PATH + source;

	try {
		await image.decode();
	} catch (error) {
		console.error(`Could not load ${image.src}: the resource was not found.`);
	}

	console.log(`%c${source} loaded`, "color: #777; font-style: italic");

	return image;
};