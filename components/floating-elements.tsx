"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
  direction?: "horizontal" | "vertical" | "circular"
}

export function FloatingElement({
  children,
  className,
  intensity = "medium",
  direction = "vertical",
}: FloatingElementProps) {
  const getAnimationClass = () => {
    const baseClass = "animate-float"

    switch (intensity) {
      case "low":
        return `${baseClass}-slow`
      case "high":
        return `${baseClass}-fast`
      default:
        return baseClass
    }
  }

  return (
    <div
      className={cn("transition-transform duration-300 ease-in-out", getAnimationClass(), className)}
      style={{
        animationDelay: `${Math.random() * 2}s`,
      }}
    >
      {children}
    </div>
  )
}

// Add custom animations to globals.css
export const floatingAnimations = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(0.5deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 4s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 2s ease-in-out infinite;
}
`
