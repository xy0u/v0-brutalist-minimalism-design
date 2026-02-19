export function MarqueeBand() {
  const text = "BRUTALIST \u2014 MINIMAL \u2014 DESIGN \u2014 OBJECTS \u2014 "
  const repeated = text.repeat(8)

  return (
    <div
      className="overflow-hidden whitespace-nowrap border-t border-b py-6"
      style={{ borderColor: "var(--foreground)" }}
    >
      <div className="animate-marquee inline-block">
        <span className="text-[3vw] font-black uppercase tracking-[0.2em] text-foreground/10">
          {repeated}
        </span>
      </div>
    </div>
  )
}
