import {Mesh, BoxGeometry, PlaneGeometry, Material, Texture, Color, PointLight} from "../src/index.js";
import {scene} from "./main.js";

export default () => {
	// Light
	{
		light = new PointLight(0xfefebe, 1.1);
		light.position.set(-4.4, 3.3, -4.4);
	}

	// Floor
	{
		floor = new Mesh(
			new PlaneGeometry(12, 12),
			new Material({texture: new Texture("tilefloor018a.jpg")}),
		);
		floor.geometry.uvs = new Float32Array([
			0.3375 * floor.geometry.height, 0, 0.3375 * floor.geometry.height,
			0.3375 * floor.geometry.width, 0, 0.3375 * floor.geometry.width,
		]);
	}

	// Walls
	{
		wall1 = new Mesh(
			new PlaneGeometry(4, 12),
			new Material({texture: new Texture("plasterwall030c.jpg")}),
		);
		wall1.position.set(0, 2, 6);
		wall1.rotation.set(0, Math.PI / 2, Math.PI / 2);
		wall1.geometry.uvs = new Float32Array([
			.25 * wall1.geometry.height, 0, .25 * wall1.geometry.height,
			.25 * wall1.geometry.width, 0, .25 * wall1.geometry.width,
		]);

		wall2 = new Mesh(
			new PlaneGeometry(4, 12),
			new Material({texture: new Texture("plasterwall030c.jpg")}),
		);
		wall2.position.set(6, 2, 0);
		wall2.rotation.set(0, Math.PI, Math.PI / 2);
		wall2.geometry.uvs = new Float32Array([
			.25 * wall2.geometry.height, 0, .25 * wall2.geometry.height,
			.25 * wall2.geometry.width, 0, .25 * wall2.geometry.width,
		]);

		wall3 = new Mesh(
			new PlaneGeometry(4, 12),
			new Material({texture: new Texture("plasterwall030c.jpg")}),
		);
		wall3.position.set(0, 2, -6);
		wall3.rotation.set(0, -Math.PI / 2, Math.PI / 2);
		wall3.geometry.uvs = new Float32Array([
			.25 * wall3.geometry.height, 0, .25 * wall3.geometry.height,
			.25 * wall3.geometry.width, 0, .25 * wall3.geometry.width,
		]);

		wall4 = new Mesh(
			new PlaneGeometry(4, 12),
			new Material({texture: new Texture("plasterwall030c.jpg")}),
		);
		wall4.position.set(-6, 2, 0);
		wall4.rotation.set(0, 0, Math.PI / 2);
		wall4.geometry.uvs = new Float32Array([
			.25 * wall4.geometry.height, 0, .25 * wall4.geometry.height,
			.25 * wall4.geometry.width, 0, .25 * wall4.geometry.width,
		]);
	}

	// Ceiling
	{
		ceiling = new Mesh(
			new PlaneGeometry(12, 12),
			new Material({texture: new Texture("woodfloor007a.jpg")}),
		);
		ceiling.position.y = 4;
		ceiling.rotation.x = Math.PI;
		ceiling.geometry.uvs = new Float32Array([
			0.3375 * ceiling.geometry.height, 0, 0.3375 * ceiling.geometry.height,
			0.3375 * ceiling.geometry.width, 0, 0.3375 * ceiling.geometry.width,
		]);
	}

	// Cube
	{
		cube = new Mesh(
			new BoxGeometry(1.7),
			new Material({color: new Color(0xff9800)}),
		);
		cube.position.set(3, .85, 4);
	}

	scene.add(light, floor, wall1, wall2, wall3, wall4, ceiling, cube);
};
export let light, floor, wall1, wall2, wall3, wall4, ceiling, cube;