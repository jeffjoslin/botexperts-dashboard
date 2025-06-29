"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  children: React.ReactNode
}

export function AnimatedCard({ className, delay = 0, direction = "up", children, ...props }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"

    switch (direction) {
      case "up":
        return "translate3d(0, 30px, 0)"
      case "down":
        return "translate3d(0, -30px, 0)"
      case "left":
        return "translate3d(30px, 0, 0)"
      case "right":
        return "translate3d(-30px, 0, 0)"
      default:
        return "translate3d(0, 30px, 0)"
    }
  }

  return (
    <Card
      ref={cardRef}
      className={cn("transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-lg", className)}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
      }}
      {...props}
    >
      {children}
    </Card>
  )
}
