import { useMemo, useRef } from "react"
import type React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll"

const damp = THREE.MathUtils.damp
const corePos = new THREE.Vector3(2, 0, 0)

// [scroll progress, x as fraction of viewport width, y] — keeps the core beside the copy, not behind it.
const PATH: [number, number, number][] = [
  [0, 0.2, 0.1],
  [0.12, 0.28, -0.2],
  [0.3, 0, 0.1],
  [0.5, 0, 0.1],
  [0.62, 0.3, 0],
  [0.8, 0.3, -0.1],
  [0.9, 0.1, 0.4],
  [1, 0.25, 0.6],
]

function samplePath(p: number) {
  for (let i = 1; i < PATH.length; i++) {
    if (p <= PATH[i][0]) {
      const [p0, x0, y0] = PATH[i - 1]
      const [p1, x1, y1] = PATH[i]
      const t = THREE.MathUtils.smoothstep(p, p0, p1)
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]
    }
  }
  const last = PATH[PATH.length - 1]
  return [last[1], last[2]]
}

/** Liquid-chrome core: the "one person" at the centre of every discipline. */
function Core() {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<React.ElementRef<typeof MeshDistortMaterial>>(null)
  const { viewport } = useThree()

  useFrame((state, dt) => {
    const m = mesh.current
    if (!m || !mat.current) return
    const p = scrollState.progress
    const v = Math.min(Math.abs(scrollState.velocity), 60)
    const mobile = viewport.width < 7

    // Path through the page: centre-right in hero, sweeps left, returns, recedes at the end.
    const [px, py] = samplePath(p)
    const x = mobile ? 0 : px * viewport.width
    const y = mobile ? 0.6 - p * 1.2 : py
    // Shrink while the work list is on screen so the blob never fights the text.
    const work = Math.max(0, 1 - Math.abs(p - 0.72) / 0.12)
    const s = (mobile ? 0.75 : 1.05) * (1 - scrollState.spread * 0.35) * (1 - work * 0.45) * (1 - Math.max(0, p - 0.85) * 2.5)

    m.position.x = damp(m.position.x, x + scrollState.pointerX * 0.25, 2.5, dt)
    m.position.y = damp(m.position.y, y + scrollState.pointerY * 0.2, 2.5, dt)
    m.scale.setScalar(damp(m.scale.x, Math.max(s, 0.35), 3, dt))
    corePos.copy(m.position)
    m.rotation.y += dt * (0.18 + v * 0.01)
    m.rotation.x = damp(m.rotation.x, p * Math.PI * 1.5 + state.pointer.y * 0.35, 2, dt)
    mat.current.distort = damp(mat.current.distort, 0.32 + v * 0.006, 4, dt)
  })

  return (
    <mesh ref={mesh} position={[2, 0, 0]}>
      <icosahedronGeometry args={[1.35, 64]} />
      <MeshDistortMaterial
        ref={mat}
        color="#c9ced6"
        metalness={1}
        roughness={0.2}
        distort={0.32}
        speed={1.4}
        envMapIntensity={1}
      />
    </mesh>
  )
}

/** Six orbiting primitives — one per trade. They fan out while the disciplines section is pinned. */
function Orbiters() {
  const group = useRef<THREE.Group>(null)
  const items = useRef<(THREE.Mesh | null)[]>([])
  const { viewport } = useThree()

  const shapes = useMemo(
    () => [
      { geo: <torusGeometry args={[0.22, 0.08, 24, 64]} />, accent: false },
      { geo: <boxGeometry args={[0.32, 0.32, 0.32]} />, accent: false },
      { geo: <octahedronGeometry args={[0.24]} />, accent: true },
      { geo: <coneGeometry args={[0.2, 0.38, 32]} />, accent: false },
      { geo: <torusKnotGeometry args={[0.14, 0.05, 96, 16]} />, accent: false },
      { geo: <sphereGeometry args={[0.18, 32, 32]} />, accent: true },
    ],
    []
  )

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = scrollState.progress
    const spread = scrollState.spread
    const mobile = viewport.width < 7
    const base = mobile ? 1.6 : 2.4
    const radius = base + spread * (mobile ? 0.6 : 1.6)

    g.rotation.y = t * 0.12 + p * Math.PI * 2
    g.rotation.z = damp(g.rotation.z, 0.35 - spread * 0.25, 2, dt)
    g.position.x = damp(g.position.x, corePos.x * (1 - spread), 2, dt)
    g.position.y = damp(g.position.y, corePos.y * (1 - spread), 2, dt)

    items.current.forEach((mesh, i) => {
      if (!mesh) return
      const a = (i / shapes.length) * Math.PI * 2
      const r = radius + Math.sin(t * 0.6 + i) * 0.12
      mesh.position.x = damp(mesh.position.x, Math.cos(a) * r, 3, dt)
      mesh.position.z = damp(mesh.position.z, Math.sin(a) * r, 3, dt)
      mesh.position.y = Math.sin(t * 0.8 + i * 1.3) * 0.25
      mesh.rotation.x += dt * (0.3 + i * 0.05)
      mesh.rotation.y += dt * 0.4
    })
  })

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} ref={(el) => (items.current[i] = el)}>
          {s.geo}
          {s.accent ? (
            <meshStandardMaterial color="#b4d2e6" metalness={0.4} roughness={0.2} envMapIntensity={1.4} />
          ) : (
            <meshStandardMaterial color="#d9d9de" metalness={1} roughness={0.18} envMapIntensity={1.1} />
          )}
        </mesh>
      ))}
    </group>
  )
}

/** Sparse dust field for depth. */
function Dust({ count = 700 }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(ph) * Math.cos(th)
      arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      arr[i * 3 + 2] = r * Math.cos(ph) - 4
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.015
    ref.current.rotation.x = scrollState.progress * 0.6
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#a9c4d6" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Rig() {
  useFrame((state, dt) => {
    scrollState.pointerX = state.pointer.x
    scrollState.pointerY = state.pointer.y
    state.camera.position.x = damp(state.camera.position.x, state.pointer.x * 0.35, 2, dt)
    state.camera.position.y = damp(state.camera.position.y, state.pointer.y * 0.25, 2, dt)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas
      className="scene"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={document.body}
      eventPrefix="client"
    >
      <ambientLight intensity={0.15} />
      <Core />
      <Orbiters />
      <Dust />
      <Rig />
      {/* Studio lighting built from lightformers — no HDR download needed. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#050506"]} />
        <Lightformer form="rect" intensity={1.2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[-6, 0, 2]} rotation-y={Math.PI / 2.4} scale={[2, 14, 1]} />
        <Lightformer form="rect" color="#b4d2e6" intensity={1.4} position={[6, -1, 1]} rotation-y={-Math.PI / 2.2} scale={[3, 12, 1]} />
        <Lightformer form="rect" intensity={0.4} position={[0, -6, 2]} rotation-x={-Math.PI / 2} scale={[14, 4, 1]} />
        <Lightformer form="rect" color="#8fa9bb" intensity={0.6} position={[0, 0, -8]} scale={[20, 10, 1]} />
      </Environment>
    </Canvas>
  )
}
