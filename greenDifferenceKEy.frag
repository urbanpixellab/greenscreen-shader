//color difference keyer green
#version 120
#extension GL_ARB_texture_rectangle : enable
#extension GL_EXT_gpu_shader4 : enable

uniform sampler2DRect texture0;
uniform vec2 lum;
vec4 lumcoeff = vec4(0.299,0.587,0.114,0.);


void main()
{   
	//punktfarbe in variable a speichern
	vec2 pos = gl_TexCoord[0].xy;
	vec4 a = texture2DRect(texture0, pos);

	//float ref = (a.r + a.b) / 2.0;
	float ref = a.r;
	if(ref < a.b) ref = a.b;
	float amask = a.g - ref;
	//amask = step(0.15,amask);
	amask = smoothstep(0.10,0.2,amask);//low high value

	//invert the key
	amask = 1.0 - amask;

	// output texture with alpha-mask
	gl_FragColor = vec4(a.rgb,amask);
}
