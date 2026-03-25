'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [fading, setFading] = useState(false)
  const [gone,   setGone]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1100)
    const t2 = setTimeout(() => setGone(true),   1500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (gone) return null

  return (
    <div
      role="status"
      aria-label="Loading Chabaqa"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg)]"
      style={{
        transition: 'opacity 0.38s cubic-bezier(.4,0,.2,1)',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(142,120,251,0.15) 0%, transparent 70%)' }}
      />

      {/* Brandmark with clip-path trim reveal */}
      <div className="relative overflow-hidden" style={{ animation: 'revealLogo 0.75s cubic-bezier(.4,0,.2,1) 0.1s both' }}>
        <Image
          src="/images/brandmark.svg"
          alt="Chabaqa"
          width={110}
          height={84}
          priority
          className="w-[110px] h-auto"
        />

        {/* Shimmer sweep after reveal */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)',
            animation: 'shimmer 0.55s cubic-bezier(.4,0,.2,1) 0.85s both',
          }}
        />
      </div>
    </div>
  )
}
