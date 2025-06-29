"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  ripple?: boolean
  glow?: boolean
  children: React.ReactNode
}

export function EnhancedButton({ className, ripple = true, glow = false, children, ...props }: EnhancedButtonProps) {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = { id: Date.now(), x, y }
      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }

    props.onClick?.(e)
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
      <Button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          glow && "hover:shadow-lg hover:shadow-primary/25",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}

        {/* Ripple effect */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </Button>
    </motion.div>
  )
}
