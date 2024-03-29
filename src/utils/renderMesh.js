import {TEXTURES, Matrix4, Vector3} from "../index.js";

let worldMatrix,
	worldViewProjectionMatrix;

export function renderMesh(gl, mesh, camera, primitiveType, viewProjectionMatrix) {
	const
		{geometry} = mesh,
		p = mesh.position.multiply(camera.lhcs).invert(),
		r = mesh.rotation.invert(),
		s = geometry.type === "plane" ?
			new Vector3(mesh.scale.x, 1, mesh.scale.y) :
			mesh.scale;

	worldMatrix = Matrix4
		.createTranslationMatrix(p)
		.multiplyMatrix4(Matrix4.createRotationMatrix(r.x, "x"))
		.multiplyMatrix4(Matrix4.createRotationMatrix(r.y, "y"))
		.multiplyMatrix4(Matrix4.createRotationMatrix(r.z, "z"))
		.multiplyMatrix4(Matrix4.createScaleMatrix(s));
	worldViewProjectionMatrix = viewProjectionMatrix.multiplyMatrix4(worldMatrix);

	gl.uniformMatrix4fv(gl.uniform.world, false, worldMatrix.data);
	gl.uniformMatrix4fv(gl.uniform.worldIT, false, worldMatrix.invert().transpose().data);
	gl.uniformMatrix4fv(gl.uniform.worldViewProjection, false, worldViewProjectionMatrix.data);

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.vertex);
	gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.normal);
	gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);

	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

	switch (mesh.material.type) {
		case "color": {
			gl.uniform4fv(gl.uniform.color, mesh.material.color.hex1);
			gl.bindTexture(gl.TEXTURE_2D, gl.defaults.texture);

			break;
		}

		case "texture": {
			gl.uniform4fv(gl.uniform.color, gl.defaults.color);

			gl.uniform1i(gl.uniform.texture, 0);
			gl.uniform1i(gl.uniform.normalMap, 1);

			// Pass the texture
			{
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, mesh.material.texture.texture);
				gl.bindBuffer(gl.ARRAY_BUFFER, gl.buffer.uv);
				gl.bufferData(gl.ARRAY_BUFFER, mesh.geometry.uvs, gl.STATIC_DRAW);
			}

			// Pass the normal map
			if (mesh.material.normalMap) {
				gl.activeTexture(gl.TEXTURE1);
				gl.bindTexture(gl.TEXTURE_2D, mesh.material.normalMap.texture);
			}

			break;
		}
	}

	gl.drawElements(primitiveType, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
};

// Pixelated filter
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);