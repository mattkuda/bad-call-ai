"use client"

import { useEffect, useRef, useState } from "react"
import { useAnimation } from "@/lib/animation-context"

interface Position {
    x: number
    y: number
    velocityX: number
    velocityY: number
    rotation: number
    rotationSpeed: number
}

export default function BouncingBasketball() {
    const { isBasketballAnimationEnabled } = useAnimation()
    const [position, setPosition] = useState<Position>({
        x: 100,
        y: 100,
        velocityX: 3,
        velocityY: 3,
        rotation: 0,
        rotationSpeed: 5
    })
    const requestRef = useRef<number>()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isBasketballAnimationEnabled) {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
            return
        }

        const animate = () => {
            setPosition(prev => {
                if (!containerRef.current) return prev

                const containerWidth = containerRef.current.offsetWidth
                const containerHeight = containerRef.current.offsetHeight
                const ballSize = 100 // Size of the basketball (increased from 60 to 100)

                let { x, y, velocityX, velocityY, rotation } = prev
                const { rotationSpeed } = prev

                // Update position
                x += velocityX
                y += velocityY
                rotation = (rotation + rotationSpeed) % 360

                // Bounce off walls
                if (x <= 0 || x >= containerWidth - ballSize) {
                    velocityX = -velocityX
                    // Add a small random variation to make it more natural
                    velocityX += (Math.random() - 0.5) * 0.5
                }

                if (y <= 0 || y >= containerHeight - ballSize) {
                    velocityY = -velocityY
                    // Add a small random variation to make it more natural
                    velocityY += (Math.random() - 0.5) * 0.5
                }

                // Keep velocity within bounds
                velocityX = Math.max(-5, Math.min(5, velocityX))
                velocityY = Math.max(-5, Math.min(5, velocityY))

                return { x, y, velocityX, velocityY, rotation, rotationSpeed }
            })

            requestRef.current = requestAnimationFrame(animate)
        }

        requestRef.current = requestAnimationFrame(animate)

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current)
            }
        }
    }, [isBasketballAnimationEnabled])

    if (!isBasketballAnimationEnabled) return null

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
        >
            <div
                className="absolute w-[100px] h-[100px]"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) rotate(${position.rotation}deg)`,
                    transition: "transform 0.05s linear"
                }}
            >
                <div className="w-full h-full relative">
                    <div className="absolute inset-0 rounded-full bg-orange-600 shadow-lg">
                        {/* Basketball lines */}
                        <div className="absolute inset-0 rounded-full border-3 border-black opacity-70"></div>
                        <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-black opacity-70 transform -translate-y-1/2"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-black opacity-70 transform -translate-x-1/2"></div>
                        <div className="absolute inset-0 rounded-full border-6 border-black opacity-20"></div>
                    </div>
                </div>
            </div>
        </div>
    )
} 