import { useMemo } from "react"

/** Small deterministic PRNG so the illustrations are identical on every render. */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const W = 480
const H = 300
const PAD = 28

function Regime() {
  const { path, bands } = useMemo(() => {
    const r = rng(7)
    const pts: [number, number][] = []
    let y = 170
    const regimes = [
      { from: 0, to: 0.38, drift: -0.9, vol: 4 },
      { from: 0.38, to: 0.52, drift: 0.4, vol: 10 },
      { from: 0.52, to: 0.66, drift: 2.4, vol: 14 },
      { from: 0.66, to: 1, drift: -1.1, vol: 5 },
    ]
    const n = 120
    for (let i = 0; i <= n; i++) {
      const f = i / n
      const reg = regimes.find((g) => f >= g.from && f <= g.to)!
      y += reg.drift + (r() - 0.5) * reg.vol
      y = Math.max(PAD + 10, Math.min(H - PAD - 10, y))
      pts.push([PAD + f * (W - PAD * 2), y])
    }
    return {
      path: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(""),
      bands: regimes.map((g, i) => ({
        x: PAD + g.from * (W - PAD * 2),
        w: (g.to - g.from) * (W - PAD * 2),
        level: [0, 1, 2, 0][i],
      })),
    }
  }, [])
  return (
    <>
      {bands.map((b, i) => (
        <rect key={i} x={b.x} y={PAD} width={b.w} height={H - PAD * 2} className={`v-band v-band-${b.level}`} />
      ))}
      <path d={path} className="v-line" />
      <g className="v-legend">
        <rect x={PAD} y={H - 18} width={10} height={10} className="v-band v-band-0" />
        <text x={PAD + 16} y={H - 9}>Calm</text>
        <rect x={PAD + 70} y={H - 18} width={10} height={10} className="v-band v-band-1" />
        <text x={PAD + 86} y={H - 9}>Transition</text>
        <rect x={PAD + 170} y={H - 18} width={10} height={10} className="v-band v-band-2" />
        <text x={PAD + 186} y={H - 9}>Stress</text>
      </g>
    </>
  )
}

function Frontier() {
  const { dots, curve, star } = useMemo(() => {
    const r = rng(42)
    const dots: [number, number][] = []
    const fx = (risk: number) => 0.9 * Math.sqrt(Math.max(0, risk - 0.12)) // return as a function of risk
    for (let i = 0; i < 420; i++) {
      const risk = 0.14 + r() * 0.8
      const ret = fx(risk) * (0.35 + r() * 0.65)
      dots.push([PAD + risk * (W - PAD * 2), H - PAD - ret * (H - PAD * 2)])
    }
    const curve: string[] = []
    for (let i = 0; i <= 40; i++) {
      const risk = 0.13 + (i / 40) * 0.82
      curve.push(`${i ? "L" : "M"}${(PAD + risk * (W - PAD * 2)).toFixed(1)},${(H - PAD - fx(risk) * (H - PAD * 2)).toFixed(1)}`)
    }
    const sr = 0.42
    return { dots, curve: curve.join(""), star: [PAD + sr * (W - PAD * 2), H - PAD - fx(sr) * (H - PAD * 2)] }
  }, [])
  return (
    <>
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} className="v-axis" />
      <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} className="v-axis" />
      {dots.map((d, i) => (
        <circle key={i} cx={d[0]} cy={d[1]} r={1.6} className="v-dot" />
      ))}
      <path d={curve} className="v-line" />
      <circle cx={star[0]} cy={star[1]} r={5} className="v-mark" />
      <text x={star[0] + 10} y={star[1] - 8} className="v-label">Max Sharpe</text>
      <text x={W - PAD} y={H - 8} className="v-label" textAnchor="end">Volatility →</text>
    </>
  )
}

function Candles() {
  const candles = useMemo(() => {
    const r = rng(3)
    const out: { x: number; o: number; c: number; h: number; l: number; bad: boolean }[] = []
    let p = 150
    const n = 34
    const step = (W - PAD * 2) / n
    for (let i = 0; i < n; i++) {
      const o = p
      const c = p + (r() - 0.48) * 18
      const bad = i === 11 || i === 24
      const h = Math.min(o, c) - r() * 10 - (bad ? 48 : 0)
      const l = Math.max(o, c) + r() * 10
      out.push({ x: PAD + i * step + step / 2, o, c, h, l, bad })
      p = c
    }
    return out
  }, [])
  return (
    <>
      {candles.map((k, i) => (
        <g key={i} className={k.c < k.o ? "v-up" : "v-down"}>
          <line x1={k.x} x2={k.x} y1={k.h} y2={k.l} className="v-wick" />
          <rect x={k.x - 4} y={Math.min(k.o, k.c)} width={8} height={Math.max(2, Math.abs(k.c - k.o))} className="v-body" />
          {k.bad && (
            <>
              <circle cx={k.x} cy={k.h} r={9} className="v-flag" />
              <text x={k.x + 14} y={k.h + 4} className="v-label">Spike flagged</text>
            </>
          )}
        </g>
      ))}
    </>
  )
}

export default function ProjectVisual({ kind }: { kind: "regime" | "frontier" | "candles" }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="visual" role="img" aria-hidden>
      {kind === "regime" && <Regime />}
      {kind === "frontier" && <Frontier />}
      {kind === "candles" && <Candles />}
    </svg>
  )
}
