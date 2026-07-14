import React from 'react'
import { cn } from '@/lib/utils'

// Define button variants and sizes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  asChild?: boolean
  children?: React.ReactNode
}

// Loading spinner component using React.createElement
const Spinner = (): React.ReactElement => {
  return React.createElement(
    'svg',
    {
      className: 'animate-spin h-4 w-4 mr-2',
      xmlns: 'http://www.w3.org/2000/svg',
      fill: 'none',
      viewBox: '0 0 24 24',
    },
    React.createElement('circle', {
      className: 'opacity-25',
      cx: '12',
      cy: '12',
      r: '10',
      stroke: 'currentColor',
      strokeWidth: '4',
    }),
    React.createElement('path', {
      className: 'opacity-75',
      fill: 'currentColor',
      d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
    })
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    isLoading = false,
    children, 
    disabled,
    ...props 
  }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    // Variant styles
    const variants = {
      default: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-500',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
      link: 'text-blue-600 underline-offset-4 hover:underline bg-transparent',
    }

    // Size styles
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-md',
      lg: 'px-6 py-3 text-base rounded-lg',
      icon: 'h-10 w-10 rounded-md',
    }

    // Build children array
    const buttonChildren: React.ReactNode[] = []
    
    if (isLoading) {
      buttonChildren.push(React.createElement(Spinner, { key: 'spinner' }))
    }
    
    if (children) {
      buttonChildren.push(children)
    }

    return React.createElement(
      'button',
      {
        className: cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        ),
        ref: ref,
        disabled: disabled || isLoading,
        ...props
      },
      ...buttonChildren
    )
  }
)

Button.displayName = 'Button'

export default Button