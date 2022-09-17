import {BoxGeometry, Color, Material, Mesh, PlaneGeometry, PointLight, Texture} from "../src/index.js";
import {scene} from "./main.js";

export default () => {
	// Light
	{
		light = new PointLight(0xfefebe, 1.3);
		light.position.set(-4.4, 3.3, 4.4);
	}

	// Floor
	{
		floor = new Mesh(
			new PlaneGeometry(120, 120),
			new Material({
				texture: new Texture("tilefloor018a.jpg"),
				normalMap: new Texture("normal.jpg"),
			}),
		);
		floor.rotation.y = -Math.PI / 2; // Rotate the texture
		floor.geometry.uvs = setPlaneUVs(floor.geometry.width, floor.geometry.height, .3375);
	}

	// Walls
	{
		wall1 = new Mesh(
			new PlaneGeometry(12, 4),
			new Material({
				texture: new Texture("brickwall.jpg"),
				normalMap: new Texture("brickwall_normal.jpg"),
			}),
		);
		wall1.position.set(0, 2, 6);
		wall1.rotation.x = -Math.PI / 2;
		wall1.geometry.uvs = setPlaneUVs(wall1.geometry.width, wall1.geometry.height, .25);

		wall2 = new Mesh(
			new PlaneGeometry(12, 4),
			new Material({
				texture: new Texture("brickwall.jpg"),
				normalMap: new Texture("brickwall_normal.jpg"),
			}),
		);
		wall2.position.set(6, 2, 0);
		wall2.rotation.set(-Math.PI / 2, 0, -Math.PI / 2);
		wall2.geometry.uvs = setPlaneUVs(wall2.geometry.width, wall2.geometry.height, .25);

		wall3 = new Mesh(
			new PlaneGeometry(12, 4),
			new Material({
				texture: new Texture("brickwall.jpg"),
				normalMap: new Texture("brickwall_normal.jpg"),
			}),
		);
		wall3.position.set(-6, 2, 0);
		wall3.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
		wall3.geometry.uvs = setPlaneUVs(wall3.geometry.width, wall3.geometry.height, .25);

		wall4 = new Mesh(
			new PlaneGeometry(12, 4),
			new Material({
				texture: new Texture("brickwall.jpg"),
				normalMap: new Texture("brickwall_normal.jpg"),
			}),
		);
		wall4.position.set(0, 2, -6);
		wall4.rotation.set(-Math.PI / 2, 0, Math.PI);
		wall4.geometry.uvs = setPlaneUVs(wall4.geometry.width, wall4.geometry.height, .25);
	}

	// Ceiling
	{
		ceiling = new Mesh(
			new PlaneGeometry(12, 12),
			new Material({
				texture: new Texture("woodfloor007a.jpg"),
				normalMap: new Texture("normal.jpg"),
			}),
		);
		ceiling.position.y = 4;
		ceiling.rotation.set(Math.PI, -Math.PI / 2, 0); // Rotate the texture
		ceiling.geometry.uvs = setPlaneUVs(ceiling.geometry.width, ceiling.geometry.height, .3375);
	}

	// Cube
	{
		cube = new Mesh(
			new BoxGeometry(1.7),
			new Material({
				texture: new Texture("noodles.jpg"),
				normalMap: new Texture("normal.jpg"),
			}),
		);
		cube.position.set(2.7, .85, 3.3);
		cube.rotation.y = -Math.PI / 7;
		cube.geometry.uvs = new Float32Array([
			// Front
			0,    0,
			0.25, 0,
			0,    0.5,
			0.25, 0.5,
			// Back
			0.5,  0,
			0.25, 0,
			0.5,  0.5,
			0.25, 0.5,
			// Left
			0,    0.5,
			0.25, 0.5,
			0,    1,
			0.25, 1,
			// Right
			0.5,  0,
			0.75, 0,
			0.5,  0.5,
			0.75, 0.5,
			// Top
			0.5,  0.5,
			0.25, 0.5,
			0.5,  1,
			0.25, 1,
			// Bottom
			0.5,  0.5,
			0.75, 0.5,
			0.5,  1,
			0.75, 1,
		]);
	}

	scene.add(light, floor, wall1, wall2, wall3, wall4, ceiling, cube);
};
export let light, floor, wall1, wall2, wall3, wall4, ceiling, cube;

function setPlaneUVs(w, h, n) {
	return new Float32Array([
		0,     0,
		n * w, 0,
		0,     n * h,
		n * w, n * h,
	]);
}