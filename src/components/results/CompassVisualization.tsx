'use client'

import { useEffect, useState } from 'react'
import type { NormalizedScore, Quadrant } from '@/types'
import { cn } from '@/lib/utils'

interface CompassProps {
  economic: number
  social: number
  size?: number
  animated?: boolean
  showLabels?: boolean
  className?: string
}

const QUADRANT_COLORS = {
  auth_right: { fill: '#fecdd3', stroke: '#dc2626', label: 'Auth. Right' },
  auth_left: { fill: '#fca5a5', stroke: '#991b1b', label: 'Auth. Left' },
  lib_right: { fill: '#fde68a', stroke: '#d97706', label: 'Lib. Right' },
  lib_left: { fill: '#bbf7d0', stroke: '#16a34a', label: 'Lib. Left' },
}

export function CompassVisualization({
  economic,
  social,
  size = 400,
  animated = true,
  showLabels = true,
  className,
}: CompassProps) {
  const [isVisible, setIsVisible] = useState(!animated)
  const padding = 48
  const innerSize = size - padding * 2
  const center = size / 2

  // Convert -100/+100 scores to SVG coordinates
  // Economic: Left(-) = left side, Right(+) = right side
  // Social: Libertarian(-) = bottom, Authoritarian(+) = top
  const dotX = center + (economic / 100) * (innerSize / 2)
  const dotY = center - (social / 100) * (innerSize / 2) // Flip Y axis

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 300)
      return () => clearTimeout(timer)
    }
  }, [animated])

  return (
    <div className={cn('relative inline-block', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        role="img"
        aria-label={`Political compass showing position at Economic: ${economic.toFixed(1)}, Social: ${social.toFixed(1)}`}
      >
        {/* Definitions */}
        <defs>
          <filter id="dot-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1c1f4c" floodOpacity="0.3" />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="center-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width={size} height={size} fill="#f8fafc" rx="16" />

        {/* Quadrant fills */}
        {/* Authoritarian Left (top-left) */}
        <rect
          x={padding}
          y={padding}
          width={innerSize / 2}
          height={innerSize / 2}
          fill="#fca5a5"
          opacity="0.25"
          rx="2"
        />
        {/* Authoritarian Right (top-right) */}
        <rect
          x={center}
          y={padding}
          width={innerSize / 2}
          height={innerSize / 2}
          fill="#fecdd3"
          opacity="0.25"
          rx="2"
        />
        {/* Libertarian Left (bottom-left) */}
        <rect
          x={padding}
          y={center}
          width={innerSize / 2}
          height={innerSize / 2}
          fill="#bbf7d0"
          opacity="0.25"
          rx="2"
        />
        {/* Libertarian Right (bottom-right) */}
        <rect
          x={center}
          y={center}
          width={innerSize / 2}
          height={innerSize / 2}
          fill="#fde68a"
          opacity="0.25"
          rx="2"
        />

        {/* Subtle grid lines */}
        {[-75, -50, -25, 25, 50, 75].map((pct) => {
          const x = center + (pct / 100) * (innerSize / 2)
          const y = center - (pct / 100) * (innerSize / 2)
          return (
            <g key={pct} opacity="0.12">
              <line x1={x} y1={padding} x2={x} y2={size - padding} stroke="#64748b" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1={padding} y1={y} x2={size - padding} y2={y} stroke="#64748b" strokeWidth="0.5" strokeDasharray="3,3" />
            </g>
          )
        })}

        {/* Main axes */}
        <line
          x1={padding}
          y1={center}
          x2={size - padding}
          y2={center}
          stroke="#334155"
          strokeWidth="1.5"
        />
        <line
          x1={center}
          y1={padding}
          x2={center}
          y2={size - padding}
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Compass border */}
        <rect
          x={padding}
          y={padding}
          width={innerSize}
          height={innerSize}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1"
          rx="4"
        />

        {/* Quadrant Labels */}
        {showLabels && (
          <>
            <text x={padding + 8} y={padding + 18} className="text-xs" fill="#991b1b" fontSize="9" fontWeight="600" fontFamily="DM Sans, sans-serif" opacity="0.7">
              AUTH. LEFT
            </text>
            <text x={size - padding - 8} y={padding + 18} className="text-xs" fill="#dc2626" fontSize="9" fontWeight="600" fontFamily="DM Sans, sans-serif" textAnchor="end" opacity="0.7">
              AUTH. RIGHT
            </text>
            <text x={padding + 8} y={size - padding - 8} className="text-xs" fill="#16a34a" fontSize="9" fontWeight="600" fontFamily="DM Sans, sans-serif" opacity="0.7">
              LIB. LEFT
            </text>
            <text x={size - padding - 8} y={size - padding - 8} className="text-xs" fill="#d97706" fontSize="9" fontWeight="600" fontFamily="DM Sans, sans-serif" textAnchor="end" opacity="0.7">
              LIB. RIGHT
            </text>
          </>
        )}

        {/* Axis Labels */}
        <text x={padding - 4} y={center + 4} fill="#64748b" fontSize="10" fontFamily="DM Mono, monospace" textAnchor="end">L</text>
        <text x={size - padding + 4} y={center + 4} fill="#64748b" fontSize="10" fontFamily="DM Mono, monospace">R</text>
        <text x={center} y={padding - 8} fill="#64748b" fontSize="10" fontFamily="DM Mono, monospace" textAnchor="middle">AUTH</text>
        <text x={center} y={size - padding + 16} fill="#64748b" fontSize="10" fontFamily="DM Mono, monospace" textAnchor="middle">LIB</text>

        {/* Score labels on axes */}
        {[-100, -50, 0, 50, 100].map((val) => {
          const x = center + (val / 100) * (innerSize / 2)
          return (
            <text
              key={`eco-${val}`}
              x={x}
              y={center + 18}
              fill="#94a3b8"
              fontSize="7"
              fontFamily="DM Mono, monospace"
              textAnchor="middle"
              opacity={val === 0 ? 0 : 0.6}
            >
              {val > 0 ? '+' : ''}{val}
            </text>
          )
        })}

        {/* User position — animated dot */}
        {isVisible && (
          <g
            style={{
              transition: animated ? 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
          >
            {/* Outer pulse ring */}
            <circle
              cx={dotX}
              cy={dotY}
              r="16"
              fill="#4c53e5"
              opacity="0.12"
            >
              {animated && (
                <animate attributeName="r" values="12;20;12" dur="2.5s" repeatCount="indefinite" />
              )}
              {animated && (
                <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2.5s" repeatCount="indefinite" />
              )}
            </circle>

            {/* Middle ring */}
            <circle
              cx={dotX}
              cy={dotY}
              r="10"
              fill="#4c53e5"
              opacity="0.2"
            />

            {/* Main dot */}
            <circle
              cx={dotX}
              cy={dotY}
              r="7"
              fill="#4c53e5"
              filter="url(#dot-shadow)"
            />

            {/* White center */}
            <circle
              cx={dotX}
              cy={dotY}
              r="2.5"
              fill="white"
            />

            {/* Crosshairs */}
            <line
              x1={dotX - 14}
              y1={dotY}
              x2={dotX - 9}
              y2={dotY}
              stroke="#4c53e5"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1={dotX + 9}
              y1={dotY}
              x2={dotX + 14}
              y2={dotY}
              stroke="#4c53e5"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1={dotX}
              y1={dotY - 14}
              x2={dotX}
              y2={dotY - 9}
              stroke="#4c53e5"
              strokeWidth="1"
              opacity="0.4"
            />
            <line
              x1={dotX}
              y1={dotY + 9}
              x2={dotX}
              y2={dotY + 14}
              stroke="#4c53e5"
              strokeWidth="1"
              opacity="0.4"
            />
          </g>
        )}

        {/* Coordinate tooltip */}
        {isVisible && (
          <g>
            <rect
              x={dotX + 12}
              y={dotY - 22}
              width={60}
              height={20}
              fill="#1e293b"
              rx="4"
              opacity="0.85"
            />
            <text
              x={dotX + 42}
              y={dotY - 8}
              fill="white"
              fontSize="8"
              fontFamily="DM Mono, monospace"
              textAnchor="middle"
            >
              {economic > 0 ? '+' : ''}{economic.toFixed(0)}, {social > 0 ? '+' : ''}{social.toFixed(0)}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

// Mini compass for cards/previews
export function MiniCompass({
  economic,
  social,
  size = 80,
}: {
  economic: number
  social: number
  size?: number
}) {
  const padding = 12
  const innerSize = size - padding * 2
  const center = size / 2
  const dotX = center + (economic / 100) * (innerSize / 2)
  const dotY = center - (social / 100) * (innerSize / 2)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="#f1f5f9" rx="8" />
      <rect x={padding} y={padding} width={innerSize / 2} height={innerSize / 2} fill="#fca5a5" opacity="0.3" />
      <rect x={center} y={padding} width={innerSize / 2} height={innerSize / 2} fill="#fecdd3" opacity="0.3" />
      <rect x={padding} y={center} width={innerSize / 2} height={innerSize / 2} fill="#bbf7d0" opacity="0.3" />
      <rect x={center} y={center} width={innerSize / 2} height={innerSize / 2} fill="#fde68a" opacity="0.3" />
      <line x1={padding} y1={center} x2={size - padding} y2={center} stroke="#94a3b8" strokeWidth="0.75" />
      <line x1={center} y1={padding} x2={center} y2={size - padding} stroke="#94a3b8" strokeWidth="0.75" />
      <circle cx={dotX} cy={dotY} r="4" fill="#4c53e5" />
      <circle cx={dotX} cy={dotY} r="2" fill="white" />
    </svg>
  )
}
