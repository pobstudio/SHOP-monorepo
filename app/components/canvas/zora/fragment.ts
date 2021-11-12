export const ZoraFragment = `#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_seed;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );
mediump float fbm( vec2 p )
{
    float f = 0.0;
    f += 0.500000* noise(p); p = m*p*2.02;
    f += 0.250000*noise(p); p = m*p*2.03;
    f += 0.125000*noise(p); p = m*p*2.01;
    f += 0.062500*noise(p); p = m*p*2.04;
    f += 0.031250*noise(p); p = m*p*2.01;
    f += 0.015625*noise(p);
    return f/0.96875;
}

vec3 stop1 = vec3(220. / 255., 200. / 255., 208. / 255.); // ##dcc8d0 (very light pink)
vec3 stop2 = vec3(120. / 255., 200. / 255., 207. / 255.); // #78c8cf (teal)
vec3 stop3 = vec3(77. / 255., 149. / 255., 158. / 255.); // #4d959e (darker teal)
vec3 stop4 = vec3(48. / 255., 94. / 255., 185. / 255.); // #305eb9 (blue)
vec3 stop5 = vec3(49. / 255., 31. / 255., 18. / 255.); // #311f12 (brown)
vec3 stop6 = vec3(104. / 255., 66. / 255., 50. / 255.); // #684232 (light brown)
vec3 stop7 = vec3(45. / 255., 28. / 255., 19. / 255.); // #2d1c13 (dark brown)

// RED THEME
vec3 stop8 = vec3(255. / 255., 133. / 255., 180. / 255.); // #ff85b4 (ash pink)
vec3 stop9 = vec3(153. / 255., 22. / 255., 22. / 255.); // #991616 (carti red)
vec3 stop10 = vec3(64. / 255., 0. / 255., 0. / 255.); // #400000 (dark red)

// yeah this will probably break if you don't use greyscale
vec3 mapColor(vec3 c) {
	if (c.x > 0.9) {
		return stop1;
	}
	else if (c.x > 0.75) {
        // w2 = (c - 0.75) / (0.9 - 0.75)
		return mix(stop8, stop1, 6.66666666667 * c + -5.);
	}
	else if (c.x > 0.6) {
        // w3 = (c - 0.6) / (0.75 - 0.6)
		return mix(stop9, stop9, 6.66666666667 * c + -4.);
	}
	else if (c.x > 0.5) {
        // w4 = (c - 0.5) / (0.6 - 0.5)
		return mix(stop8, stop9, 10. * c + -5.);
	}
	else if (c.x > 0.25) {
        // w5 = (c - 0.25) / (0.5 - 0.25)
		return mix(stop5, stop8, 4. * c + -1.);
	}
	else if (c.x > 0.1) {
        // w6 = (c - 0.1) / (0.25 - 0.1)
		return mix(stop6, stop5, 6.66666666667 * c + -0.6666667);
	}
	else if (c.x > 0.05) {
        // w7 = (c - 0.05) / (0.1 - 0.05)
		return mix(stop7, stop6, 20. * c + -1.);
	}
	return stop10;
}

void main() {
    mediump vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st *= 0.7;
    lowp vec3 color = vec3(0.0);
    vec2 rand = vec2(random2(st) + u_time);
    float seed = 111. * random2(vec2(u_seed)).y;
    float t = abs(5.0- 5. *sin(u_time*.1));
    t += abs(7.9 - 7.9 * sin(u_time*.02 + 3.1));
	t *= 0.7;
    st += noise(st*1.5 + seed)*t - u_time * 0.05;
    float fbm_st = fbm(st);
    color = vec3(smoothstep(.01,.15,fbm_st) - smoothstep(.13,.15,fbm(st * 0.5)));
    lowp vec3 mappedColor = mapColor(color) + vec3(random2(rand).x * 0.1);
    gl_FragColor = vec4(mappedColor,1.0);
}`;
