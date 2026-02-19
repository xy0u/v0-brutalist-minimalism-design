import { GridOverlay } from "@/components/grid-overlay"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { MarqueeBand } from "@/components/marquee-band"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <GridOverlay />
      <Navigation />
      <Hero />
      <ProductGrid />
      <MarqueeBand />
      <AboutSection />
      <Footer />
    </main>
  )
}
