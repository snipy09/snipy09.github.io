import { useCallback, useEffect, useState } from "react"

export type Theme = "light" | "dark"

function read(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light"
}

/** Theme is set before paint by the inline script in index.html; this keeps React in sync. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem("theme")
      } catch {
        /* storage unavailable */
      }
      if (stored) return
      const next: Theme = mq.matches ? "dark" : "light"
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = read() === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {
      /* storage unavailable */
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
