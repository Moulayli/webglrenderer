import {Keybind, VELOCITY} from "./config.js";
import {renderer, panoramaScene, camera, keys} from "./main.js";
import {light} from "./init.js";
import {spinValue} from "./events.js";

export default () => {
	// Cancel diagonal movement addition
	v = VELOCITY *
		(
			(keys.has(Keybind.forward) || keys.has(Keybind.backward)) &&
			(keys.has(Keybind.left) || keys.has(Keybind.right)) ?
				Math.SQRT1_2 :
				1
		);

	if (keys.has(Keybind.forward))	camera.moveForward(v);
	if (keys.has(Keybind.backward))	camera.moveForward(-v);
	if (keys.has(Keybind.left))		camera.moveRight(-v);
	if (keys.has(Keybind.right))	camera.moveRight(v);
	if (keys.has(Keybind.up))		camera.moveUp(v);
	if (keys.has(Keybind.down))		camera.moveUp(-v);

	t += .000188;

	/*camera.rotation.set(
		-Math.PI / 6.1,
		// spinValue,
		// 3.16,
		// 2.28,
		3.16 + Math.PI * 2 * t * 8,
		0,
	);*/

	renderer.render(panoramaScene, camera);
};

let v, t = 0;