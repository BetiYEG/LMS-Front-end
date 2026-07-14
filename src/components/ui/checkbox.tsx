import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// ✅ EXPORT this interface
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string
}

// Helper function for shorter syntax
const el = React.createElement

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps  // ← Use the exported interface
>(({ className, ...props }, ref) => {
  return el(
    CheckboxPrimitive.Root,
    {
      ref: ref,
      className: cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      ),
      ...props,
    },
    el(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
      },
      el(CheckIcon, { className: "h-4 w-4" })
    )
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }