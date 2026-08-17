import { useState, useEffect, useRef, useCallback } from "react"
import { ShaderBackground } from "@/components/ui/shader-b3e94fd7"
import { Volume2, VolumeX, RotateCcw } from "lucide-react"

interface RoleItem {
  text: string
  badge: string
  description: string
  duration: number
  progress: number
}

const PRELOADER_ROLES: RoleItem[] = [
  {
    text: "sajal.dev",
    badge: "ENGINEERING // SYSTEMS ARCHITECT",
    description: "CORE INFRASTRUCTURE & FULL-STACK SYSTEMS",
    duration: 1600,
    progress: 18,
  },
  {
    text: "sajal.quant",
    badge: "QUANTITATIVE // ALGORITHMIC TRADING",
    description: "STATISTICAL ARBITRAGE & HIGH-FREQUENCY RESEARCH",
    duration: 1600,
    progress: 38,
  },
  {
    text: "sajal.ai_engineer",
    badge: "ARTIFICIAL INTELLIGENCE // NEURAL AGENTS",
    description: "AUTONOMOUS AGENTS & LARGE FOUNDATION MODELS",
    duration: 1600,
    progress: 58,
  },
  {
    text: "sajal.automation_engineer",
    badge: "AUTOMATION // ENTERPRISE PIPELINES",
    description: "DISTRIBUTED WORKFLOWS & ARCHITECTURE",
    duration: 1600,
    progress: 78,
  },
  {
    text: "sajal.founder",
    badge: "VENTURES // PRODUCT INNOVATION",
    description: "BUILDING NEXT-GENERATION INTELLIGENT PRODUCTS",
    duration: 1700,
    progress: 92,
  },
  {
    text: "COMING SOON",
    badge: "PORTFOLIO // LAUNCH PROTOCOL",
    description: "ALL SYSTEMS COMPILED. STAND BY FOR LAUNCH.",
    duration: 0,
    progress: 100,
  },
]

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

export default function App() {
  const [displayText, setDisplayText] = useState("010101010101")
  const [roleBadge, setRoleBadge] = useState("BOOT_SEQUENCE")
  const [roleDescription, setRoleDescription] = useState("INITIALIZING DIGITAL REPOSITORY...")
  const [progress, setProgress] = useState(0)
  const [progressStatus, setProgressStatus] = useState("COMPILING ASSETS")
  const [telemetryModule, setTelemetryModule] = useState("MODULE: INIT_BOOT")
  const [telemetryHash, setTelemetryHash] = useState("0x7F8A2B")
  const [isFinal, setIsFinal] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const animFrameRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Web Audio Synthesizer
  const playSound = useCallback((type: "tick" | "lock") => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      if (type === "tick") {
        osc.type = "sine"
        osc.frequency.setValueAtTime(800 + Math.random() * 1200, ctx.currentTime)
        gain.gain.setValueAtTime(0.015, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.03)
      } else {
        osc.type = "triangle"
        osc.frequency.setValueAtTime(1400, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08)
        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.09)
      }
    } catch {
      // Audio fallback
    }
  }, [soundEnabled])

  // Text scramble implementation
  const scrambleTo = useCallback((targetText: string, duration = 650): Promise<void> => {
    return new Promise((resolve) => {
      cancelAnimationFrame(animFrameRef.current)
      let frame = 0
      const current = displayText
      const length = Math.max(current.length, targetText.length)
      const queue: { from: string; to: string; start: number; end: number; char: string }[] = []

      for (let i = 0; i < length; i++) {
        const from = current[i] || ""
        const to = targetText[i] || ""
        const start = Math.floor(Math.random() * (duration / 40))
        const end = start + Math.floor(Math.random() * (duration / 30)) + 15
        queue.push({ from, to, start, end, char: "" })
      }

      function update() {
        let output = ""
        let complete = 0

        for (let i = 0; i < queue.length; i++) {
          const item = queue[i]
          if (frame >= item.end) {
            complete++
            output += item.to
          } else if (frame >= item.start) {
            if (!item.char || Math.random() < 0.28) {
              item.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
              if (Math.random() < 0.25) {
                playSound("tick")
              }
            }
            output += item.char
          } else {
            output += item.from
          }
        }

        setDisplayText(output)

        if (complete === queue.length) {
          resolve()
        } else {
          frame++
          animFrameRef.current = requestAnimationFrame(update)
        }
      }

      update()
    })
  }, [displayText, playSound])

  // Preloader sequence runner
  const startSequence = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsFinal(false)
    setProgress(5)
    setRoleBadge("BOOT_SEQUENCE")
    setRoleDescription("INITIALIZING DIGITAL REPOSITORY...")
    setProgressStatus("COMPILING ASSETS")
    setTelemetryModule("MODULE: INIT_BOOT")
    setTelemetryHash(`0x${Math.random().toString(16).substring(2, 8).toUpperCase()}`)

    await scrambleTo("010101010101", 500)
    await new Promise((r) => { timeoutRef.current = setTimeout(r, 250) })

    for (let i = 0; i < PRELOADER_ROLES.length; i++) {
      const role = PRELOADER_ROLES[i]
      const finalStep = i === PRELOADER_ROLES.length - 1

      setRoleBadge(role.badge)
      setRoleDescription(role.description)
      setProgress(role.progress)
      setProgressStatus(finalStep ? "STATUS // LOCKED" : `LOADING // ${role.text.toUpperCase()}`)
      setTelemetryModule(`MODULE: ${role.text.replace(".", "_").toUpperCase()}`)
      setTelemetryHash(`0x${Math.random().toString(16).substring(2, 8).toUpperCase()}`)

      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)

      await scrambleTo(role.text, finalStep ? 850 : 600)
      playSound("lock")

      if (finalStep) {
        setIsFinal(true)
        break
      }

      await new Promise((r) => { timeoutRef.current = setTimeout(r, role.duration) })
    }
  }, [scrambleTo, playSound])

  useEffect(() => {
    startSequence()
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-mono flex flex-col justify-center items-center select-none">
      {/* Interactive WebGL Shader Background */}
      <div className="absolute inset-0 -z-10 w-full h-full pointer-events-auto opacity-70">
        <ShaderBackground className="w-full h-full" />
      </div>

      {/* Subtle CRT Scanlines & Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.3))",
          backgroundSize: "100% 4px",
          opacity: 0.35,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Top Controls */}
      <header className="fixed top-6 right-8 z-50 flex items-center gap-3">
        <button
          onClick={() => {
            const next = !soundEnabled
            setSoundEnabled(next)
            if (next) playSound("lock")
          }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-xs tracking-wider border backdrop-blur-md transition-all ${
            soundEnabled
              ? "bg-white/10 text-white border-white/40"
              : "bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white hover:border-white/25"
          }`}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{soundEnabled ? "SOUND [ON]" : "SOUND [OFF]"}</span>
        </button>

        {isFinal && (
          <button
            onClick={startSequence}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-xs tracking-wider border bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white hover:border-white/25 backdrop-blur-md transition-all animate-fade-in"
            aria-label="Replay Sequence"
          >
            <RotateCcw size={13} />
            <span>REPLAY</span>
          </button>
        )}
      </header>

      {/* Main Preloader Content */}
      <main className="relative z-10 flex flex-col items-center text-center w-11/12 max-w-3xl px-4 py-8">
        {/* Role Badge */}
        <div className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-neutral-400 mb-8 uppercase">
          <span className="text-neutral-600">[</span>
          <span className="transition-colors duration-300">{roleBadge}</span>
          <span className="text-neutral-600">]</span>
        </div>

        {/* Digital Scramble Display */}
        <div className="mb-12 min-h-[140px] flex flex-col justify-center items-center">
          <h1
            className={`font-digital text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white whitespace-nowrap transition-all duration-300 ${
              isGlitching ? "glitch-flash" : ""
            } ${isFinal ? "tracking-wider" : ""}`}
            style={{
              fontFamily: "'Share Tech Mono', 'JetBrains Mono', monospace",
              textShadow: "none",
            }}
          >
            {displayText}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 tracking-[0.15em] uppercase mt-4 transition-all duration-300">
            {roleDescription}
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="w-full max-w-md flex flex-col gap-2.5">
          <div className="flex justify-between text-xs text-neutral-400 tracking-wider font-mono">
            <span>{progressStatus}</span>
            <span className="text-white font-semibold">{progress < 10 ? `0${progress}` : progress}%</span>
          </div>

          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-neutral-500 tracking-wider mt-0.5">
            <span>{telemetryModule}</span>
            <span>{telemetryHash}</span>
          </div>
        </div>
      </main>
    </div>
  )
}
