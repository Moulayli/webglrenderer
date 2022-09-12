import {AmbientLight, DirectionalLight} from "../index.js";

export function renderLight(gl, light) {
	switch (true) {
		case light instanceof AmbientLight:
			gl.uniform4fv(gl.uniform.lightColor, light.value);

			break;
		case light instanceof DirectionalLight:
			gl.uniform4fv(gl.uniform.lightColor, light.value);
			gl.uniform3fv(gl.uniform.reverseLightDir, light.direction.normalize().xyz());

			break;
	}
};