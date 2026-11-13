export default function BackHeader({ onBack, label = '← Back' }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        paddingBottom: 8,
        background: 'linear-gradient(180deg,rgba(135,206,235,.95) 80%,rgba(135,206,235,0))',
        marginBottom: 10,
      }}
    >
      <button
        className="bb"
        onClick={onBack}
        style={{
          background: 'white',
          border: '2px solid #b8ddf5',
          borderRadius: 14,
          color: '#3a90c8',
          padding: '9px 20px',
          fontSize: '.95rem',
          fontWeight: 800,
          boxShadow: '0 3px 12px rgba(100,160,230,.3)',
          transition: 'all .2s',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {label}
      </button>
    </div>
  )
}
