"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const products = [
  {
    name: "Forma Chair",
    price: "$2,400",
    image: "/images/product-1.jpg",
  },
  {
    name: "Arc Lamp",
    price: "$1,800",
    image: "/images/product-2.jpg",
  },
  {
    name: "Monolith Sofa",
    price: "$5,600",
    image: "/images/product-3.jpg",
  },
  {
    name: "Terra Vases",
    price: "$480",
    image: "/images/product-4.jpg",
  },
  {
    name: "Void Pendant",
    price: "$1,200",
    image: "/images/product-5.jpg",
  },
  {
    name: "Slab Table",
    price: "$3,100",
    image: "/images/product-6.jpg",
  },
]

export function ProductGrid() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
      { threshold: 0.15 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="products-grid">
      {products.map((product, i) => (
        <div
          key={product.name}
          ref={(el) => { cardsRef.current[i] = el }}
          className="card card-animate"
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{
              filter: "grayscale(1) contrast(1.1)",
              transition: "transform 1.2s cubic-bezier(0.8, 0, 0.2, 1), filter 1.2s cubic-bezier(0.8, 0, 0.2, 1)",
            }}
          />
          <div className="card-content">
            <h3>{product.name}</h3>
            <span className="price">{product.price}</span>
            <button className="btn-buy" type="button">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}
