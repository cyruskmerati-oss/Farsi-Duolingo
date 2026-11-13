// Background scene.
//
// PORT IN PROGRESS: the original is 6.5 KB of hand-built SVG (a sun with
// sixteen animated rays, drifting clouds, hills, a house, flowers, birds).
// Only the gradient is ported so far; the scene is still to come.
export default function Sky() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg,#5bb8f5 0%,#a8dcf7 45%,#d4f0ff 75%,#e8f8ff 100%)',
      }}
    />
  )
}
