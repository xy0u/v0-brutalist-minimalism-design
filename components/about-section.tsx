"use client"

import { useEffect, useRef } from "react"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="card-animate px-[5%] py-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/40 mb-6">
            About
          </p>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            We craft objects that define space.
          </h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-lg leading-relaxed text-foreground/70 max-w-lg">
            ELVA is a brutalist design studio creating architectural objects for
            modern living. Each piece balances raw material honesty with refined
            minimalism, merging functionality and sculptural form.
          </p>
          <p className="text-lg leading-relaxed text-foreground/70 max-w-lg mt-6">
            Founded in 2019, we work with concrete, steel, solid wood, and
            hand-formed ceramics. Our process strips away the unnecessary,
            leaving only what matters.
          </p>
        </div>
      </div>
    </section>
  )
}
