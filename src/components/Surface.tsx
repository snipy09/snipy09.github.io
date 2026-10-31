import { useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { prefersReducedMotion, scrollState, type Shape } from "@/lib/scroll"

const damp = THREE.MathUtils.damp
const SHAPES: Shape[] = ["quant", "ai", "automation"]

// The surface is one plane whose height is a weighted blend of three functions,
// one per area of work. Contours are drawn in the fragment shader from the height.
const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec3 uW;
  uniform vec2 uProbe;
  uniform float uProbeAmt;
  varying float vH;
  varying vec2 vUv;
  varying float vProbe;

  float quant(vec2 p) {
    // Implied-volatility smile: x = moneyness, y = time to expiry.
    float x = p.x;
    float t = p.y * 0.5 + 0.5;
    float smile = x * x * (1.15 - 0.75 * t);
    float skew = -0.28 * x * (1.0 - t);
    float term = 0.18 * (1.0 - t);
    return smile + skew + term + 0.035 * sin(uTime * 0.5 + x * 3.0 + t * 4.0) - 0.3;
  }

  float ai(vec2 p) {
    // Loss landscape: a wide bowl with a global and a local minimum.
    float bowl = 0.32 * dot(p, p);
    float g = -0.85 * exp(-(pow(p.x - 0.28, 2.0) + pow(p.y + 0.12, 2.0)) / 0.09);
    float l = -0.45 * exp(-(pow(p.x + 0.48, 2.0) + pow(p.y - 0.42, 2.0)) / 0.05);
    float rough = 0.07 * sin(5.0 * p.x + uTime * 0.25) * cos(4.0 * p.y - uTime * 0.2);
    return bowl + g + l + rough + 0.2;
  }

  float automation(vec2 p) {
    // A periodic signal: the same job, on schedule.
    return 0.17 * sin(9.0 * p.x - uTime * 1.2) * (0.75 + 0.25 * cos(2.4 * p.y)) + 0.05 * sin(5.0 * p.y + uTime * 0.6);
  }

  void main() {
    vUv = uv;
    vec2 p = uv * 2.0 - 1.0;
    float h = uW.x * quant(p) + uW.y * ai(p) + uW.z * automation(p);
    float d = distance(uv, uProbe);
    vProbe = exp(-d * d / 0.006) * uProbeAmt;
    h += 0.22 * vProbe;
    vH = h;
    vec3 pos = position;
    pos.z += h * 1.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform float uReveal;
  uniform float uOpacity;
  uniform vec3 uInk;
  uniform vec3 uSignal;
  varying float vH;
  varying vec2 vUv;
  varying float vProbe;

  float line(float v, float width) {
    float w = fwidth(v) * width;
    float f = abs(fract(v - 0.5) - 0.5);
    return 1.0 - smoothstep(0.0, w, f);
  }

  void main() {
    // Contours every 1/16 of height; every fourth one is heavier.
    float minor = line(vH * 16.0, 1.0);
    float major = line(vH * 4.0, 1.6);
    // Faint measurement grid.
    float grid = max(line(vUv.x * 24.0, 0.8), line(vUv.y * 24.0, 0.8)) * 0.18;

    float a = max(max(minor * 0.42, major * 0.85), grid);

    // Soft edges so the plane never shows a hard border.
    vec2 e = smoothstep(0.0, 0.18, vUv) * smoothstep(0.0, 0.18, 1.0 - vUv);
    a *= e.x * e.y;

    // Load-in: contours draw from the front edge to the back.
    a *= 1.0 - smoothstep(uReveal * 1.15 - 0.15, uReveal * 1.15, vUv.y);

    vec3 col = mix(uInk, uSignal, clamp(vProbe * 1.4 + major * 0.15, 0.0, 1.0));
    gl_FragColor = vec4(col, a * uOpacity);
  }
`

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const group = useRef<THREE.Group>(null)
  const hit = useRef<THREE.Mesh>(null)
  const { viewport, camera } = useThree()
  const reduced = useMemo(prefersReducedMotion, [])
  const weights = useRef(new THREE.Vector3(1, 0, 0))
  const probe = useRef(new THREE.Vector2(0.5, 0.5))
  const raycaster = useMemo(() => new THREE.Raycaster(), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uW: { value: new THREE.Vector3(1, 0, 0) },
      uProbe: { value: new THREE.Vector2(0.5, 0.5) },
      uProbeAmt: { value: 0 },
      uReveal: { value: reduced ? 1 : 0 },
      uOpacity: { value: 1 },
      uInk: { value: new THREE.Color("#101828") },
      uSignal: { value: new THREE.Color("#2b4bf2") },
    }),
    [reduced]
  )

  useFrame((state, dt) => {
    const m = mat.current
    const g = group.current
    if (!m || !g) return
    const u = m.uniforms
    const mobile = viewport.width < 7

    if (!reduced) u.uTime.value += dt
    if (scrollState.ready) u.uReveal.value = Math.min(1, u.uReveal.value + dt * 0.55)

    // Ease toward the active area's function.
    const target = SHAPES.indexOf(scrollState.shape)
    const w = weights.current
    const k = reduced ? 100 : 2.2
    w.x = damp(w.x, target === 0 ? 1 : 0, k, dt)
    w.y = damp(w.y, target === 1 ? 1 : 0, k, dt)
    w.z = damp(w.z, target === 2 ? 1 : 0, k, dt)
    u.uW.value.copy(w)

    const vis = scrollState.visibility
    u.uOpacity.value = damp(u.uOpacity.value, (mobile ? 0.32 : 1) * vis, 6, dt)

    // Desktop: the surface sits in the right half, beside the copy. Mobile: low and behind it.
    g.position.x = damp(g.position.x, mobile ? 0 : viewport.width * 0.26, 3, dt)
    g.position.y = damp(g.position.y, mobile ? -viewport.height * 0.18 : -0.35, 3, dt)
    g.rotation.z = damp(g.rotation.z, state.pointer.x * 0.08, 2, dt)

    // Probe: lift the surface under the cursor.
    let amt = 0
    if (hit.current && !mobile) {
      raycaster.setFromCamera(state.pointer, camera)
      const hits = raycaster.intersectObject(hit.current)
      if (hits[0]?.uv) {
        probe.current.lerp(hits[0].uv, 0.25)
        amt = 1
      }
    }
    u.uProbe.value.copy(probe.current)
    u.uProbeAmt.value = damp(u.uProbeAmt.value, amt, 4, dt)
  })

  return (
    <group ref={group}>
      <group rotation={[-1.08, 0, 0.62]}>
        <mesh>
          <planeGeometry args={[5.6, 5.6, 200, 200]} />
          <shaderMaterial
            ref={mat}
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh ref={hit} visible={false}>
          <planeGeometry args={[5.6, 5.6, 1, 1]} />
          <meshBasicMaterial side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

export default function Surface() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Plane />
    </Canvas>
  )
}
