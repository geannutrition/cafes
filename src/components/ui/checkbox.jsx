"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked)
    }
  }

  return (
    <div className="relative flex items-center">
      <input type="checkbox" ref={ref} checked={checked} onChange={handleChange} className="sr-only" {...props} />
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-gray-300 flex items-center justify-center cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-gray-900 border-gray-900" : "bg-white",
          className,
        )}
        onClick={() => onCheckedChange && onCheckedChange(!checked)}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
