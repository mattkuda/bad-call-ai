"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface AnimationContextType {
    isBasketballAnimationEnabled: boolean
    toggleBasketballAnimation: () => void
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
    const [isBasketballAnimationEnabled, setIsBasketballAnimationEnabled] = useState(false)

    const toggleBasketballAnimation = () => {
        setIsBasketballAnimationEnabled(prev => !prev)
    }

    return (
        <AnimationContext.Provider
            value={{
                isBasketballAnimationEnabled,
                toggleBasketballAnimation
            }}
        >
            {children}
        </AnimationContext.Provider>
    )
}

export function useAnimation() {
    const context = useContext(AnimationContext)
    if (context === undefined) {
        throw new Error("useAnimation must be used within an AnimationProvider")
    }
    return context
} 