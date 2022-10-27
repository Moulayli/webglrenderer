import {renderer, camera, keys} from "./main.js";

export let spinValue = 0;

const
	pressKeys = e => {
		e.preventDefault();

		keys.add(e.code);
	},
	releaseKeys = e => {
		e.preventDefault();

		keys.delete(e.code);
	},
	lookAround = e => camera.lookAround(e),
	pointerLockChange = () => {
		// Check if the renderer is focused
		if (renderer.isLocked()) {
			addEventListener("keydown", pressKeys);
			addEventListener("keyup", releaseKeys);
			addEventListener("mousemove", lookAround);
		} else {
			removeEventListener("keydown", pressKeys);
			removeEventListener("keyup", releaseKeys);
			removeEventListener("mousemove", lookAround);

			keys.clear();
		}
	};

addEventListener("resize", () => {
	renderer.stretch();

	// Update camera aspect ratio
	camera.aspect = renderer.width / renderer.height;
	camera.updateProjectionMatrix();
});

addEventListener("click", e => {
	e.target === renderer.canvas && renderer.lock();
});

// window.addEventListener("pointerlockchange") doesn't fire in some browsers
document.addEventListener("pointerlockchange", pointerLockChange);

// Test: camera spin input
{
	spin.max = Math.PI * 2;
	spin.addEventListener("input", function() {
		debug.textContent = spinValue = this.value;
	});

	// vid.playbackRate = 8;
}