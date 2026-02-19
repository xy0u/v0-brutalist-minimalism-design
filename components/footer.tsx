import Link from "next/link"

export function Footer() {
  return (
    <footer
      id="contact"
      className="px-[5%] py-16 border-t"
      style={{ borderColor: "var(--foreground)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/40 mb-4">
            Contact
          </p>
          <p className="text-foreground">studio@elva.design</p>
          <p className="text-foreground/60 mt-1">+1 (555) 000-0000</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/40 mb-4">
            Location
          </p>
          <p className="text-foreground">12 Concrete Ave</p>
          <p className="text-foreground/60 mt-1">New York, NY 10013</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/40 mb-4">
            Social
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-foreground uppercase text-sm font-semibold tracking-wider hover:opacity-60 transition-opacity">
              Instagram
            </Link>
            <Link href="#" className="text-foreground uppercase text-sm font-semibold tracking-wider hover:opacity-60 transition-opacity">
              Pinterest
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-foreground/10 flex justify-between items-center">
        <p className="text-xs text-foreground/30 uppercase tracking-[0.3em]">
          ELVA {new Date().getFullYear()}
        </p>
        <p className="text-xs text-foreground/30 uppercase tracking-[0.3em]">
          All rights reserved
        </p>
      </div>
    </footer>
  )
}
