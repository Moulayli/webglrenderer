#version 300 es

in vec4 a_position;
in vec3 a_normal;
in vec2 a_uv;

uniform mat4 u_worldViewProjection;
uniform mat4 u_world;
uniform mat4 u_worldIT;
uniform vec3 u_lightPos;

out vec3 v_normal;
out vec2 v_uv;
out vec3 v_surfaceToLightPos;

void main() {
	gl_Position = u_worldViewProjection * a_position;

	vec3 surfaceToWorldPos = (u_world * a_position).xyz;

	v_normal = mat3(u_worldIT) * a_normal;
	v_uv = a_uv;
	v_surfaceToLightPos = u_lightPos - surfaceToWorldPos;
}