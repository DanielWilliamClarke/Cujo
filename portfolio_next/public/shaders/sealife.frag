// Copyright (c) 2023 by Matthias Hurrle (https://codepen.io/atzedent/pen/qByYwNd)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// The following shader was adapter to work with p5js
// and modified to work with webgl v1 instead of v2

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 touch;
uniform int pointerCount;

#define PI 3.14159
#define TAU 6.28318
#define THETA 1.57079
#define T (17.  +time)
#define mouse (touch / resolution)
#define hue(a) (.25 + .4 * cos(a * 11.3 + vec3(0,83, 21)))
#define rot(a) mat2(cos(a), -sin(a), sin(a), cos(a))

void main(void) {
    float mn = min(resolution.x, resolution.y);
    vec2 uv = (
        gl_FragCoord.xy - .5 *resolution
    ) / mn;

    vec3 col = vec3(0),
    lp = vec3(9, 5, 2),
    rp = vec3(9, 6, 7),
    ro = vec3(.7, .9, 3),
    rd = normalize(vec3(uv, 1)),
    ax = normalize(vec3(8, -3, -5)),
    p;
    
    float g = .0, angle = sin(T * .1) * PI;
    
    if(pointerCount > 0) {
        ax = normalize(vec3(1, -5, 5));
        ax.xz *= rot(mouse.x * TAU);
        angle = mouse.y * PI;
    } else {
        ax.xz *= rot(T * .05);
    }
    
    for(float i = 1.; i < 35.; i++) {
        p = g * rd - ro;
        p = mix(
            dot(p, ax) * ax,
            p,
            cos(angle)
        ) * THETA - cross(p, ax);
        float d = 1., e = .0;

        for(float j = .0; j < 16.; j++) {
            p = lp - abs(p - rp);
            e = 9. / clamp(dot(p, p), .0, 16.);
            d *= e * 1.01;
            p = abs(p) * e;
        }

        e = p.y / d;
        e += +3e-4;
        g += e * .5;

        col += mix(
            vec3(1),
            hue(-log(d) * .25),
            .75
        ) / e * 5e-5;
    }
    
    col = 1. - exp(-col * 1.8);
    col = pow(col, vec3(1.45));
    vec2 z = (gl_FragCoord.xy -.5 * resolution.xy) / mn;
    col *= 1. - dot(z, z);

    gl_FragColor = vec4(col, 1);
}