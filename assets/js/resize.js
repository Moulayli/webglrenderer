import {ctx} from "./main.js";
import {SCREEN} from "./vars.js";

export const resize = () => {
	SCREEN.WIDTH = innerWidth;
	SCREEN.HEIGHT = innerHeight;
	SCREEN.WIDTH2 = SCREEN.WIDTH / 2;
	SCREEN.HEIGHT2 = SCREEN.HEIGHT / 2;
};