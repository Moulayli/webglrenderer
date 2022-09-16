import {Keybind, VELOCITY} from "./config.js";
import {renderer, scene, camera, keys} from "./main.js";
import {light, cube} from "./init.js";

export default () => {
	// Cancel diagonal movement addition
	v = VELOCITY * ((keys.has(Keybind.forward) || keys.has(Keybind.backward)) && (keys.has(Keybind.left) || keys.has(Keybind.right)) ? Math.SQRT1_2 : 1);

	keys.has(Keybind.forward)	&& camera.moveForward(v);
	keys.has(Keybind.backward)	&& camera.moveForward(-v);
	keys.has(Keybind.left)		&& camera.moveRight(-v);
	keys.has(Keybind.right)		&& camera.moveRight(v);
	keys.has(Keybind.up)		&& camera.moveUp(v);
	keys.has(Keybind.down)		&& camera.moveUp(-v);

	cube.rotation.y -= 0.01;
	light.position.x = Math.cos(performance.now() / 1000) * 4;

	renderer.render(scene, camera);
};

let v;