"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface EnhancedInputProps extends React.ComponentProps<typeof Input> {
  label?: string
  floating?: boolean
}

export function EnhancedInput({ className, label, floating = false, ...props }: EnhancedInputProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(false)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0)
    props.onChange?.(e)
  }

  if (floating && label) {
    return (
      <div className="relative">
        <Input
          className={cn(
            "peer transition-all duration-200 pt-6 pb-2",
            "focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "hover:border-primary/50",
            className,
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <motion.label
          className={cn(
            "absolute left-3 text-muted-foreground pointer-events-none transition-all duration-200",
            "peer-focus:text-primary peer-focus:text-xs peer-focus:top-2",
            hasValue || isFocused ? "text-xs top-2" : "text-sm top-1/2 -translate-y-1/2",
          )}
          animate={{
            fontSize: hasValue || isFocused ? "0.75rem" : "0.875rem",
            y: hasValue || isFocused ? 0 : "-50%",
            top: hasValue || isFocused ? "0.5rem" : "50%",
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      </div>
    )
  }

  return (
    <motion.div whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Input
        className={cn(
          "transition-all duration-200",
          "focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "hover:border-primary/50",
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    </motion.div>
  )
}
