"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

interface NewButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    asChild?: boolean
}

export function NewButton({
    children,
    className,
    disabled,
    asChild = false,
    ...props
}: NewButtonProps) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            className={cn(
                "btn-new",
                disabled && "opacity-60 cursor-not-allowed",
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </Comp>
    )
} 