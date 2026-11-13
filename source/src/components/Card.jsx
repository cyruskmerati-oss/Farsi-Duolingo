export default function Card({ children, style = {}, ...rest }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 24,
        boxShadow: '0 4px 24px rgba(100,160,230,.18)',
        border: '1.5px solid rgba(255,255,255,.95)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
