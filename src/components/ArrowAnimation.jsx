import React, { useEffect, useRef } from 'react'

export default function ArrowAnimation({ from, to }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let start = null
    const duration = 1000 // 1 second

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = (timestamp - start) / duration
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a simple curved arrow from (100,150) to (300,150) with progress
      ctx.beginPath()
      ctx.moveTo(100, 150)
      ctx.quadraticCurveTo(200, 100, 300, 150)
      ctx.strokeStyle = 'red'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw arrowhead at progress point
      const t = Math.min(progress, 1)
      const x = (1 - t) * 100 + t * 300
      const y = 150 - 50 * (t * (1 - t)) // simple quadratic arc
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x - 10, y - 5)
      ctx.lineTo(x - 10, y + 5)
      ctx.fill()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    const animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [from, to])

  return <canvas ref={canvasRef} width={400} height={200} className="absolute inset-0 pointer-events-none" />
}