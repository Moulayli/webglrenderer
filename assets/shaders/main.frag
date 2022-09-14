#version 300 es

precision highp float;

in vec3 v_normal;
in vec2 v_uv;
in vec3 v_surfaceToLight;

uniform vec4 u_color;
uniform vec4 u_lightColor;
uniform sampler2D u_texture;

out vec4 fragColor;

void main() {
	vec3 normal = normalize(v_normal);
	vec3 surfaceToLightDir = normalize(v_surfaceToLight);
	float light = dot(normal, surfaceToLightDir);

	fragColor = u_lightColor * (u_color * texture(u_texture, v_uv));
	fragColor.rgb *= light * u_lightColor.a;
}