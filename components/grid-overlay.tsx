export function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} />
      ))}
    </div>
  )
}
