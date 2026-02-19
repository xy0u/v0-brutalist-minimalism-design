"use client"

import Link from "next/link"

export function Navigation() {
  return (
    <header className="nav-elva">
      <div className="logo">ELVA</div>
      <nav className="flex gap-10">
        <Link href="#work">Work</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
      </nav>
    </header>
  )
}
