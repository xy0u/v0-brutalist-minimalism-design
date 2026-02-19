export function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">ELVA</h1>
      <div className="flex justify-between items-end mt-8 px-[1vw]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/50">
          Brutalist Design Studio
        </p>
        <div className="animate-scroll-pulse">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M10 3v14m0 0l-5-5m5 5l5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
