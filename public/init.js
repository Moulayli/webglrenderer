import {BoxGeometry, Color, Material, Mesh, PlaneGeometry, PointLight, Texture, Vector2} from "../src/index.js";
import {renderer, scene, panoramaScene, camera} from "./main.js";
import {PLAYER_HEIGHT} from "./config.js";

export default () => {
	camera.aspect = renderer.width / renderer.height;
	camera.updateProjectionMatrix();
	camera.rotation.set(0, 0, 0);

	// HL2 tests
	if (false) {
		const setPlaneUVs = (w, h, n) => new Float32Array([
			0,          0,
			n * w / 32, 0,
			0,          n * h / 32,
			n * w / 32, n * h / 32,
		]);

		camera.position.set(0, PLAYER_HEIGHT, 0);

		scene.background = new Color(0x151515);

		const texture = {
			normal: new Texture("normal.jpg"),
			plasterwall030a: new Texture("plasterwall030a.jpg"),
			plasterwall030c: new Texture("plasterwall030c.jpg"),
			tilefloor018a: new Texture("tilefloor018a.jpg"),
		};
		const geometry = {
			floor: new PlaneGeometry(303, 332),
			wall: {
				odd: new PlaneGeometry(303, 128),
				even: new PlaneGeometry(213.4, 128),
			},
			ceiling: new PlaneGeometry(303, 213.4),
		};
		const material = {
			floor: new Material({
				texture: texture.tilefloor018a,
				normalMap: texture.normal,
			}),
			lowerwall: new Material({
				texture: texture.plasterwall030c,
				normalMap: texture.normal,
			}),
			upperwall: new Material({
				texture: texture.plasterwall030a,
				normalMap: texture.normal,
			}),
			ceiling: new Material({
				texture: texture.plasterwall030a,
				normalMap: texture.normal,
			}),
		};

		// Light
		{
			light = new PointLight(0xfefebe, 1.3);
			light.position.set(0, 192, 0);
		}

		// Floor
		{
			floor = new Mesh(geometry.floor, material.floor);
			floor.position.z = -59.3;
			floor.geometry.uvs = new Float32Array([
				.55375 + 0,                0,
				.55375 + .3375 * 303 / 32, 0,
				.55375 + 0,                .3375 * 332 / 32,
				.55375 + .3375 * 303 / 32, .3375 * 332 / 32,
			]);
		}

		// Walls
		{
			// Lower walls
			{
				// Front wall
				lowerwall1 = new Mesh(geometry.wall.odd, material.lowerwall);
				lowerwall1.geometry.uvs = setPlaneUVs(lowerwall1.geometry.width, lowerwall1.geometry.height, .25);
				lowerwall1.position.set(0, 64, 106.7);
				lowerwall1.rotation.set(-Math.PI / 2, 0, 0);

				// Right wall (building entrance)
				lowerwall2 = new Mesh(new PlaneGeometry(213.4, 128), material.lowerwall);
				lowerwall2.geometry.uvs = setPlaneUVs(lowerwall2.geometry.width, lowerwall2.geometry.height, .25);
				lowerwall2.position.set(151.5, 64, 0);
				lowerwall2.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2);

				// Back wall
				lowerwall3 = new Mesh(geometry.wall.odd, material.lowerwall);
				lowerwall3.geometry.uvs = setPlaneUVs(lowerwall3.geometry.width, lowerwall3.geometry.height, .25);
				lowerwall3.position.set(0, 64, -106.7);
				lowerwall3.rotation.set(Math.PI / 2, Math.PI, 0);
			}

			// Upper walls
			{
				// Front wall
				upperwall1 = new Mesh(geometry.wall.odd, material.upperwall);
				upperwall1.geometry.uvs = setPlaneUVs(upperwall1.geometry.width, upperwall1.geometry.height, .25);
				upperwall1.position.set(0, 192, 106.7);
				upperwall1.rotation.set(-Math.PI / 2, 0, 0);

				// Back wall
				upperwall2 = new Mesh(geometry.wall.even, material.upperwall);
				upperwall2.geometry.uvs = setPlaneUVs(upperwall2.geometry.width, upperwall2.geometry.height, .25);
				upperwall2.position.set(151.5, 192, 0);
				upperwall2.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2);

				// Back wall
				upperwall3 = new Mesh(geometry.wall.odd, material.upperwall);
				upperwall3.geometry.uvs = setPlaneUVs(upperwall3.geometry.width, upperwall3.geometry.height, .25);
				upperwall3.position.set(0, 192, -106.7);
				upperwall3.rotation.set(Math.PI / 2, Math.PI, 0);
			}
		}

		// Ceiling
		{
			ceiling = new Mesh(geometry.ceiling, material.ceiling);
			ceiling.geometry.uvs = setPlaneUVs(ceiling.geometry.width, ceiling.geometry.height, .3375);
			ceiling.position.y = 256;
			ceiling.rotation.x = Math.PI;
		}

		scene.add(floor, lowerwall1, lowerwall2, lowerwall3, upperwall1, upperwall2, upperwall3, ceiling, light);
	}

	// Cubemap tests
	{
		const
			textures = [
				new Texture("panorama_0.png"),
				new Texture("panorama_1.png"),
				new Texture("panorama_2.png"),
				new Texture("panorama_3.png"),
				new Texture("panorama_4.png"),
				new Texture("panorama_5.png"),
			],
			geometry = new PlaneGeometry(16, 16),
			meshes = Array.from({length: 6}, (_, i) => new Mesh(
				geometry,
				// new Material({color: new Color(0xff9800)}),
				new Material({texture: textures[i]}),
			)),
			light = new PointLight(0xffffff, 1.2);

		// UVs
		for (const mesh of meshes) mesh.geometry.uvs = new Float32Array([1, 0, 1, 1, 0, 0, 0, 1]);

		// Position/angle
		{
			meshes[0].position.z = 8;
			meshes[0].rotation.set(0, Math.PI / 2, Math.PI / 2);

			meshes[1].position.x = 8;
			meshes[1].rotation.set(Math.PI, 0, -Math.PI / 2);

			meshes[2].position.z = -8;
			meshes[2].rotation.set(0, -Math.PI / 2, Math.PI / 2);

			meshes[3].position.x = -8;
			meshes[3].rotation.set(0, 0, Math.PI / 2);

			meshes[4].position.y = 8;
			meshes[4].rotation.set(Math.PI, Math.PI / 2, 0);

			meshes[5].position.y = -8;
			meshes[5].rotation.set(0, Math.PI / 2, 0);
		}

		panoramaScene.add(...meshes, light);
	}
};
export let floor, lowerwall1, lowerwall2, lowerwall3, upperwall1, upperwall2, upperwall3, ceiling, light;