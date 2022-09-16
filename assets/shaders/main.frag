#version 300 es

precision highp float;

in vec3 v_normal;
in vec2 v_uv;
in vec3 v_surfaceToLight;

uniform vec4 u_color;
uniform vec4 u_ambientColor;
uniform sampler2D u_normalMap;
uniform sampler2D u_texture;

out vec4 fragColor;

void main() {
	vec3 normal = normalize(v_normal);
	vec3 surfaceToLightDir = normalize(v_surfaceToLight);

	// vec3 normalMap = texture(u_normalMap, v_uv).rgb;
	// normalMap = normalize(normalMap * 2.0 - 1.0);
	float light = dot(normal, surfaceToLightDir);

	vec4 ambient = texture(u_texture, v_uv) * u_color * u_ambientColor;

	fragColor = ambient * light;
}