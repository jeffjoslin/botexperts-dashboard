"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: "subtle" | "vibrant" | "dark"
}

export function GradientBackground({ children, className, variant = "subtle" }: GradientBackgroundProps) {
  const getGradientClass = () => {
    switch (variant) {
      case "vibrant":
        return "bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-500/20"
      case "dark":
        return "bg-gradient-to-br from-gray-900 via-purple-900/50 to-blue-900/50"
      default:
        return "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
    }
  }

  return (
    <div className={cn("relative overflow-hidden", getGradientClass(), className)}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
