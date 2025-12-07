'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { LiquidOptions } from './LiquidPresets';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uIntensity;
uniform float uScale;

varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    float time = uTime;
    vec2 uv = vUv * uScale;
    
    // Create moving coordinate systems for each color layer
    vec2 uv1 = uv + vec2(time * 0.1, time * 0.05);
    vec2 uv2 = uv + vec2(-time * 0.08, time * 0.12);
    vec2 uv3 = uv + vec2(time * 0.04, -time * 0.15);
    
    // Generate noise values
    float n1 = snoise(uv1) * 0.5 + 0.5; // 0.0 ~ 1.0
    float n2 = snoise(uv2 * 1.5) * 0.5 + 0.5;
    float n3 = snoise(uv3 * 0.8) * 0.5 + 0.5;
    
    // Mix colors based on noise
    vec3 color = mix(uColor1, uColor2, n1);
    color = mix(color, uColor3, n2);
    
    // Add extra depth/shadows based on n3
    float shadow = smoothstep(0.3, 0.7, n3);
    color = mix(color, color * 0.8, shadow * uIntensity);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function GradientPlane({ options }: { options: LiquidOptions }) {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color(options.color1) },
            uColor2: { value: new THREE.Color(options.color2) },
            uColor3: { value: new THREE.Color(options.color3) },
            uIntensity: { value: options.intensity },
            uScale: { value: options.scale },
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime() * options.speed;

            // Smoothly interpolate colors and other values for preset transitions
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uColor1.value.lerp(new THREE.Color(options.color1), 0.05);
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uColor2.value.lerp(new THREE.Color(options.color2), 0.05);
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uColor3.value.lerp(new THREE.Color(options.color3), 0.05);
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uIntensity.value += (options.intensity - (mesh.current.material as THREE.ShaderMaterial).uniforms.uIntensity.value) * 0.05;
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uScale.value += (options.scale - (mesh.current.material as THREE.ShaderMaterial).uniforms.uScale.value) * 0.05;
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function LiquidBackground({ options }: { options: LiquidOptions }) {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <GradientPlane options={options} />
            </Canvas>
        </div>
    );
}
