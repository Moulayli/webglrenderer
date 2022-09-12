import {keys, renderer, camera} from "./main.js";

const
	pressKeys = e => {
		e.preventDefault();

		keys.add(e.code);
	},
	releaseKeys = e => {
		e.preventDefault();

		keys.delete(e.code);
	},
	pointerLockChange = () => {
		// Check if the cursor is locked on this renderer
		if (renderer.isLocked()) {
			addEventListener("keydown", pressKeys);
			addEventListener("keyup", releaseKeys);
			addEventListener("mousemove", camera.lookAround);
		} else {
			removeEventListener("keydown", pressKeys);
			removeEventListener("keyup", releaseKeys);
			removeEventListener("mousemove", camera.lookAround);

			keys.clear();
		}
	};

addEventListener("resize", () => {
	renderer.stretch();

	// Update aspect ratio
	camera.aspect = renderer.width / renderer.height;
	camera.updateProjectionMatrix();
});

addEventListener("click", e => {
	e.target === renderer.canvas && renderer.lock();
});

// window.addEventListener("pointerlockchange") doesn't fire in some browsers
document.addEventListener("pointerlockchange", pointerLockChange);