import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { Theme } from "@/hooks/useTheme"

const N = 18 // columns per side
const GAP = 0.62
const PALETTE = {
  light: { base: "#d9dbe1", top: "#1d1d1f", accent: "#0071e3", fog: "#fbfbfd" },
  dark: { base: "#2a2b30", top: "#f5f5f7", accent: "#2997ff", fog: "#0b0b0c" },
}

/**
 * Isometric field of columns. Heights follow a slow travelling wave; the cursor
 * raises a ripple where it passes. Rendered with one InstancedMesh (one draw call).
 */
function Columns({ theme, still }: { theme: Theme; still: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const pointer = useRef(new THREE.Vector2(99, 99))
  const smoothed = useRef(new THREE.Vector2(99, 99))
  const { camera, raycaster } = useThree()
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), [])
  const hit = useMemo(() => new THREE.Vector3(), [])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colors = PALETTE[theme]
  const cBase = useMemo(() => new THREE.Color(colors.base), [colors.base])
  const cTop = useMemo(() => new THREE.Color(colors.top), [colors.top])
  const cAccent = useMemo(() => new THREE.Color(colors.accent), [colors.accent])
  const tmp = useMemo(() => new THREE.Color(), [])
  const offset = ((N - 1) * GAP) / 2

  useFrame((state, dt) => {
    const m = mesh.current
    if (!m) return
    const t = still ? 2 : state.clock.elapsedTime

    // Project the pointer onto the ground plane.
    if (state.pointer.x !== 0 || state.pointer.y !== 0) {
      raycaster.setFromCamera(state.pointer, camera)
      if (raycaster.ray.intersectPlane(plane, hit)) pointer.current.set(hit.x, hit.z)
    }
    smoothed.current.lerp(pointer.current, Math.min(1, dt * 6))

    let i = 0
    for (let x = 0; x < N; x++) {
      for (let z = 0; z < N; z++) {
        const px = x * GAP - offset
        const pz = z * GAP - offset
        const wave = Math.sin(px * 0.55 + t * 0.9) * Math.cos(pz * 0.45 - t * 0.6) * 0.5 + 0.5
        const d = Math.hypot(px - smoothed.current.x, pz - smoothed.current.y)
        const ripple = Math.max(0, 1 - d / 2.2) ** 2
        const h = 0.25 + wave * 0.9 + ripple * 1.8

        dummy.position.set(px, h / 2, pz)
        dummy.scale.set(1, h, 1)
        dummy.updateMatrix()
        m.setMatrixAt(i, dummy.matrix)

        const k = Math.min(1, (h - 0.25) / 2.4)
        tmp.copy(cBase).lerp(cTop, k * 0.55)
        if (ripple > 0.35) tmp.lerp(cAccent, (ripple - 0.35) * 1.2)
        m.setColorAt(i, tmp)
        i++
      }
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    m.rotation.y = still ? 0 : Math.sin(t * 0.15) * 0.08
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, N * N]}>
      <boxGeometry args={[GAP * 0.78, 1, GAP * 0.78]} />
      <meshStandardMaterial roughness={0.55} metalness={0.05} />
    </instancedMesh>
  )
}

/** Fit the field to the canvas at any size. */
function Fit() {
  const { camera, size } = useThree()
  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera
    cam.zoom = Math.min(size.width, size.height * 1.25) / 15.5
    cam.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Fog({ color }: { color: string }) {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.Fog(color, 14, 26)
  }, [scene, color])
  return null
}

export default function GridField({ theme }: { theme: Theme }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const still = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, [])

  // Stop rendering when scrolled out of view.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="grid-field" aria-hidden>
      <Canvas
        orthographic
        dpr={[1, 2]}
        frameloop={visible && !still ? "always" : "demand"}
        camera={{ position: [10, 9.5, 10], zoom: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0.6, 0)}
      >
        <Fit />
        <Fog color={PALETTE[theme].fog} />
        <hemisphereLight args={["#ffffff", "#666666", theme === "dark" ? 0.9 : 1.4]} />
        <directionalLight position={[5, 10, 3]} intensity={theme === "dark" ? 1.2 : 1.6} />
        <Columns theme={theme} still={still} />
      </Canvas>
    </div>
  )
}
