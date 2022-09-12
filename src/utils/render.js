import {Matrix4, renderMesh} from "../index.js";

let viewProjectionMatrix;

export default function(scene, camera) {
	const {gl} = this;

	gl.clearColor(...scene.background.hex1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	viewProjectionMatrix = camera.projectionMatrix
		.multiplyMatrix4(Matrix4.createTranslationMatrix(camera.distance.invert())) // Pivot point
		.multiplyMatrix4(Matrix4.createRotationMatrix(-camera.rotation.x, "x")) // X rotation
		.multiplyMatrix4(Matrix4.createRotationMatrix(camera.rotation.y, "y")) // Y rotation
		.multiplyMatrix4(Matrix4.createTranslationMatrix(camera.position.multiply(camera.lhcs))); // Translation

	// Render meshes
	for (const mesh of scene.meshes) {
		mesh.visible && renderMesh(gl, mesh, camera, this.primitiveType, viewProjectionMatrix);
	}

	// Render average light value
	let averageLightColor = [0, 0, 0, 0],
		visibleLights = 0;

	for (const light of scene.lights) {
		if (light.visible && light.intensity) {
			visibleLights++;
			averageLightColor[0] += light.value[3] * light.value[0];
			averageLightColor[1] += light.value[3] * light.value[1];
			averageLightColor[2] += light.value[3] * light.value[2];
			averageLightColor[3] += light.value[3];

			light.position && gl.uniform3fv(gl.uniform.lightWorldPos, light.position.xyz());
		}
	}

	averageLightColor = averageLightColor.map(i => i / visibleLights);
	gl.uniform4fv(gl.uniform.lightColor, averageLightColor);
};