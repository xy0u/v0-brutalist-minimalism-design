"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const products = [
  { id: 1, name: "Nasi Goreng Spesial", price: "Rp 25.000", image: "/images/product-1.jpg", stock: 10 },
  { id: 2, name: "Mie Ayam Bakso", price: "Rp 20.000", image: "/images/product-2.jpg", stock: 8 },
  { id: 3, name: "Soto Ayam Lamongan", price: "Rp 22.000", image: "/images/product-3.jpg", stock: 5 },
  { id: 4, name: "Es Teh Manis", price: "Rp 5.000", image: "/images/product-4.jpg", stock: 20 },
  { id: 5, name: "Ayam Geprek", price: "Rp 18.000", image: "/images/product-5.jpg", stock: 0 },
  { id: 6, name: "Jus Alpukat", price: "Rp 12.000", image: "/images/product-6.jpg", stock: 15 },
]

export function KantinPreview() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const heroRef = useRef<HTMLHeadingElement>(null)
  const heroPRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Intersection Observer for card animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = (Array.from(el.parentElement?.children || []).indexOf(el) % 2) * 150
            setTimeout(() => {
              el.style.opacity = "1"
              el.style.transform = "translateY(0)"
            }, delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    // Hero animation
    if (heroRef.current) {
      setTimeout(() => {
        if (heroRef.current) {
          heroRef.current.style.opacity = "1"
          heroRef.current.style.transform = "translateY(0)"
        }
      }, 200)
    }
    if (heroPRef.current) {
      setTimeout(() => {
        if (heroPRef.current) {
          heroPRef.current.style.opacity = "1"
          heroPRef.current.style.transform = "translateY(0)"
        }
      }, 600)
    }

    // Header hide/show on scroll
    const header = document.querySelector("header")
    let lastScroll = 0
    const handleScroll = () => {
      const current = window.scrollY
      if (header) {
        if (current > lastScroll && current > 200) {
          header.style.opacity = "0"
          header.style.transform = "translateY(-20px)"
          header.style.transition = "all 0.5s cubic-bezier(0.8, 0, 0.2, 1)"
        } else {
          header.style.opacity = "1"
          header.style.transform = "translateY(0)"
        }
      }
      lastScroll = current
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleAddCart = (name: string) => {
    const toast = document.getElementById("elva-toast")
    if (toast) {
      toast.textContent = `${name.toUpperCase()} ADDED`
      toast.classList.add("show")
      setTimeout(() => toast.classList.remove("show"), 2200)
    }
  }

  return (
    <>
      {/* Grid Overlay */}
      <div className="grid-overlay">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      {/* Header */}
      <header>
        <div className="logo">KANTIN</div>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#menu">{"Cart (0)"}</a>
          <a href="#menu">Exit</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <h1
            ref={heroRef}
            style={{
              opacity: 0,
              transform: "translateY(120px)",
              transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            KANTIN
          </h1>
          <p
            ref={heroPRef}
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            The Digital Experience
          </p>
        </section>

        {/* Marquee */}
        <div className="marquee-band">
          <div className="marquee-inner">
            {["Fresh Daily", "Handcrafted", "Premium Quality", "Order Now",
              "Fresh Daily", "Handcrafted", "Premium Quality", "Order Now",
            ].map((text, i) => (
              <span key={i}>{i % 2 === 1 ? `\u2022 ${text} \u2022` : text}</span>
            ))}
          </div>
        </div>

        {/* Products */}
        <section className="products" id="menu">
          {products.map((p, i) => (
            <div
              key={p.id}
              className="card"
              ref={(el) => { cardsRef.current[i] = el }}
              style={{
                opacity: 0,
                transform: "translateY(80px)",
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="card-content">
                <small>{"Edition / 2026"}</small>
                <h3>{p.name}</h3>
                <div className="price">{p.price}</div>
                {p.stock > 0 ? (
                  <button
                    className="btn-buy"
                    onClick={() => handleAddCart(p.name)}
                  >
                    {"Add to Cart +"}
                  </button>
                ) : (
                  <span
                    className="price"
                    style={{
                      opacity: 0.4,
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    Sold Out
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          KANTIN
          <p>{"\u00A9 2026 \u2014 All rights reserved"}</p>
        </div>
        <div className="footer-links">
          <a href="#menu">Menu</a>
          <a href="#menu">Cart</a>
          <a href="#menu">Exit</a>
        </div>
      </footer>

      {/* Toast */}
      <div id="elva-toast" className="toast">
        ADDED TO CART
      </div>
    </>
  )
}
