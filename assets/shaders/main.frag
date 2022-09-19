#version 300 es

precision highp float;

in vec2 v_uv;
in vec3 v_surfaceToLightPos;
in vec3 v_normal;

uniform vec4 u_color;
uniform vec3 u_lightColor;
uniform sampler2D u_texture;
uniform sampler2D u_normalMap;
uniform vec4 u_fogColor;
uniform float u_fogAmount;

out vec4 FragColor;

void main() {
	FragColor = u_color * texture(u_texture, v_uv);

	// Normalize the normal because it is interpolated and not 1.0 in length any more
	vec3 normal = texture(u_normalMap, v_uv).rgb;
	normal = normalize(normal * 2.0 - 1.0);

	// Calculate the light direction and make its length 1.
	vec3 surfaceToLightDir = normalize(v_surfaceToLightPos);

	// Calculate the dot product of the light direction and the normal (orientation of a surface)
	float light = max(dot(v_normal, surfaceToLightDir), 0.0);

	// Calculate the final color from diffuse reflection
	vec3 diffuse = FragColor.rgb * u_lightColor * light;

	FragColor = mix(vec4(diffuse, FragColor.a), u_fogColor, u_fogAmount);
}