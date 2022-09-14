import {Mesh, BoxGeometry, PlaneGeometry, Material, Texture, Color, AmbientLight, PointLight} from "../src/index.js";
import {scene, camera} from "./main.js";

export default () => {
	scene.background = new Color(0x5b4428);

	// Light
	{
		light = new AmbientLight(0xfefebe, 1.1);
		// light = new PointLight(0xfefebe, 1.1);
		// light.position.set(-4.4, 3.3, -4.4);
		// light.position.set(0, 3.3, 0);
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
			new BoxGeometry(2),
			// new Material({color: new Color(0xff9800)}),
			new Material({texture: new Texture("noodles.jpg")}),
		);
		// cube.position.set(3, .85, 4);
		cube.position.set(0, 1.5, 4);
		// cube.rotation.y = Math.PI / 2;
		cube.geometry.uvs = new Float32Array([
			// select the top left image
			0   , 0  ,
			0.25, 0  ,
			0   , 0.5,
			0.25, 0.5,
			// select the top middle image
			0.25, 0  ,
			0.5 , 0  ,
			0.25, 0.5,
			0.5 , 0.5,
			// select to top right image
			0.5 , 0  ,
			0.75, 0  ,
			0.5 , 0.5,
			0.75, 0.5,
			// select the bottom left image
			0   , 0.5,
			0.25, 0.5,
			0   , 1  ,
			0.25, 1  ,
			// select the bottom middle image
			0.25, 0.5,
			0.5 , 0.5,
			0.25, 1  ,
			0.5 , 1  ,
			// select the bottom right image
			0.5 , 0.5,
			0.75, 0.5,
			0.5 , 1  ,
			0.75, 1  ,
		]);
	}

	scene.add(light, floor, wall1, wall2, wall3, wall4, ceiling, cube);
};
export let light, floor, wall1, wall2, wall3, wall4, ceiling, cube;