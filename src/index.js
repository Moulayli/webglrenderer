export const SENSITIVITY_X = 1.2;
export const SENSITIVITY_Y = 1.2;
export const TEXTURES = new Map();
export const TEXTURE_PATH = "assets/textures/";

export {OrthographicCamera, PerspectiveCamera} from "./cameras/index.js";
export {BoxGeometry, PlaneGeometry} from "./geometries/index.js";
export {Color, Material, Mesh, Renderer, Scene, Texture} from "./global/index.js";
export {AmbientLight, DirectionalLight, PointLight} from "./lights/index.js";
export {TextureLoader} from "./loaders/index.js";
export {Matrix4, Vector2, Vector3} from "./math/index.js";
export {loadShader, parseLocations, projectOrthogonal, render, renderLight, renderMesh} from "./utils/index.js";