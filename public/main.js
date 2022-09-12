import {Renderer, Scene, PerspectiveCamera, TextureLoader} from "../src/index.js";
import "./events.js";
import init from "./init.js";
import loop from "./loop.js";

/**
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Fly up
 * [LeftCtrl]	Fly down
 * 
 * @see {@link https://github.com/matteokeole/jsrenderer/tree/webgl}
 * @see {@link https://www.youtube.com/watch?v=lCSNhq1oAFo&t=51s}
 * @see {@link https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web}
 * @see {@link https://www.sitepoint.com/building-3d-engine-javascript}
 * @see {@link https://www.youtube.com/watch?v=OVQxTNd2U3w&t=1220s}
 * @see {@link https://stackoverflow.com/questions/4097688/draw-distorted-image-on-html5s-canvas}
 * @see {@link https://www.mamboleoo.be/articles/how-to-render-3d-in-2d-canvas}
 */
export const
	keys		= new Set(),
	renderer	= new Renderer(0, 0, {
		CULL_FACE: true,
		DEPTH_TEST: true,
	}),
	scene		= new Scene(),
    camera      = new PerspectiveCamera(90, 1, .1, 100),
	loader		= new TextureLoader(),
	sources		= await (await fetch("public/textures.json")).json();

await renderer.loadProgram("assets/shaders");
await loader.load(renderer.gl, sources);

renderer.stretch();
document.body.children[0].appendChild(renderer.canvas);

camera.aspect = renderer.width / renderer.height;
camera.updateProjectionMatrix();
camera.position.set(0, 2.003, 0);

init();

loop.start();