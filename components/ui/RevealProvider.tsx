'use client'
import { useEffect } from 'react'

export default function RevealProvider() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view')
        })
      },
      { threshold: 0.08 }
    )
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger')
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
