import {Renderer, Scene, PerspectiveCamera, TextureLoader} from "../src/index.js";
import "./events.js";
import init from "./init.js";
import loop from "./loop.js";

/**
 * Controls
 * [W]			Walk forward
 * [S]			Walk backward
 * [A]			Strafe left
 * [D]			Strafe right
 * [Space]		Fly up
 * [LeftCtrl]	Fly down
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