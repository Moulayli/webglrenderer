import {FRAMES_PER_SECOND} from "./config.js";
import update from "./update.js";

export default {
	start: () => {
		CURRENT_FRAME = 0;
		interval = 1000 / FRAMES_PER_SECOND;
		start = then = performance.now();

		loop();
	},
	stop: () => cancelAnimationFrame(request),
};
export let CURRENT_FRAME, ELAPSED;

let interval, start, then, now, diff, request;

function loop() {
	request = requestAnimationFrame(loop);

	now = performance.now();
	diff = now - then;

	if (CURRENT_FRAME === 0 || diff > interval) {
		then = now - diff % interval;

		ELAPSED = then - start;
		CURRENT_FRAME++;

		update();
	}
};