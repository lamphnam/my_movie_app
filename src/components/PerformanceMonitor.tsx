// src/components/PerformanceMonitor.tsx
// Optional component for development - shows performance metrics

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
    fps: number
    memory?: number
    renderTime: number
}

export const PerformanceMonitor = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        fps: 0,
        renderTime: 0,
    })
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only show in development
        if (import.meta.env.PROD) return

        let frameCount = 0
        let lastTime = performance.now()
        let animationFrameId: number

        const measureFPS = () => {
            frameCount++
            const currentTime = performance.now()

            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

                setMetrics((prev) => ({
                    ...prev,
                    fps,
                    memory: (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize
                        ? Math.round((performance as Performance & { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1048576)
                        : undefined,
                }))

                frameCount = 0
                lastTime = currentTime
            }

            animationFrameId = requestAnimationFrame(measureFPS)
        }

        animationFrameId = requestAnimationFrame(measureFPS)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    // Toggle with Ctrl+Shift+P
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                setIsVisible((prev) => !prev)
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    if (!isVisible || import.meta.env.PROD) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/80 p-3 text-xs text-white font-mono backdrop-blur-sm border border-white/20">
            <div className="space-y-1">
                <div className="flex justify-between gap-4">
                    <span>FPS:</span>
                    <span className={metrics.fps < 30 ? 'text-red-400' : metrics.fps < 50 ? 'text-yellow-400' : 'text-green-400'}>
                        {metrics.fps}
                    </span>
                </div>
                {metrics.memory !== undefined && (
                    <div className="flex justify-between gap-4">
                        <span>Memory:</span>
                        <span>{metrics.memory} MB</span>
                    </div>
                )}
                <div className="pt-2 text-[10px] text-gray-400 border-t border-white/10">
                    Press Ctrl+Shift+P to toggle
                </div>
            </div>
        </div>
    )
}

export default PerformanceMonitor
