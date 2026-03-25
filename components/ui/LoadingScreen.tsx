'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [fading, setFading] = useState(false)
  const [gone,   setGone]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1900)
    const t2 = setTimeout(() => setGone(true),   2350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      role="status"
      aria-label="Loading Chabaqa"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg)]"
      style={{ transition: 'opacity 0.45s cubic-bezier(.4,0,.2,1)', opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}
    >

      {/* ── Soft ambient glow ── */}
      <div
        aria-hidden="true"
        className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(142,120,251,0.18) 0%, transparent 70%)',
          animation: 'blobMove 5s ease-in-out infinite',
        }}
      />

      {/* ── Logo + trim-path ring ── */}
      <div className="relative flex items-center justify-center" style={{ animation: 'fadeDown 0.55s cubic-bezier(.4,0,.2,1) both' }}>

        {/*
          SVG ring drawn around the logo.
          viewBox: 0 0 204 76  (logo 140×30 + 32px h-pad + 23px v-pad + 3px stroke)
          rect: x=3 y=3 w=198 h=70 rx=20
        */}
        <svg
          width="204" height="76"
          viewBox="0 0 204 76"
          className="absolute top-0 left-0"
          aria-hidden="true"
        >
          {/* Track ring (dim) */}
          <rect
            x="3" y="3" width="198" height="70" rx="20"
            fill="none"
            stroke="var(--bd)"
            strokeWidth="1.5"
          />

          {/* Animated trim-path ring */}
          <rect
            x="3" y="3" width="198" height="70" rx="20"
            fill="none"
            stroke="var(--p)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength="1"
            style={{
              strokeDasharray:  1,
              strokeDashoffset: 1,
              animation: 'drawLine 1.35s cubic-bezier(.4,0,.2,1) 0.25s forwards',
            }}
          />

          {/* Leading dot that rides the end of the stroke */}
          <circle r="4" fill="var(--p)" aria-hidden="true">
            <animateMotion
              dur="1.35s"
              begin="0.25s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            >
              <mpath xlinkHref="#ring-path"/>
            </animateMotion>
          </circle>
          {/* Hidden path for the dot to follow */}
          <rect
            id="ring-path"
            x="3" y="3" width="198" height="70" rx="20"
            fill="none" stroke="none"
          />
        </svg>

        {/* Logo image */}
        <div className="px-8 py-[23px]">
          <Image
            src="/images/logo.svg"
            alt="Chabaqa"
            width={140}
            height={30}
            priority
            className="h-[30px] w-auto"
          />
        </div>
      </div>

      {/* ── Animated dots bar ── */}
      <div
        className="flex items-center gap-2 mt-10"
        aria-hidden="true"
        style={{ animation: 'fadeUp 0.5s 0.6s ease both' }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--p)]"
            style={{
              opacity: 0.3,
              animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

    </div>
  )
}
