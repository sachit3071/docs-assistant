// src/components/ModeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for client-side to prevent hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md border border-foreground/20 hover:bg-foreground/10"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}
