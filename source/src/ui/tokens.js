// Shared visual tokens, lifted from the original bundle so the rebuild keeps
// the same look rather than drifting into a new one.

export const heading = {
  textAlign: 'center',
  color: '#1a3a5c',
  fontSize: '1.9rem',
  fontWeight: 900,
  marginBottom: 6,
  textShadow: '0 2px 10px rgba(58,144,200,.18)',
}

export const primaryButton = {
  background: 'linear-gradient(135deg,#3a90c8,#1a6dab)',
  color: '#fff',
  border: 'none',
  borderRadius: 14,
  padding: '13px 26px',
  fontWeight: 800,
  fontSize: '1rem',
  boxShadow: '0 4px 16px rgba(58,144,200,.35)',
  transition: 'all .2s',
}

export const secondaryButton = {
  background: 'rgba(255,255,255,.9)',
  color: '#3a90c8',
  border: '1.5px solid #b8ddf5',
  borderRadius: 14,
  padding: '13px 26px',
  fontWeight: 800,
  fontSize: '1rem',
  transition: 'all .2s',
}

export const roundIcon = {
  position: 'fixed',
  top: 14,
  zIndex: 9999,
  background: 'rgba(255,255,255,.8)',
  border: 'none',
  borderRadius: '50%',
  width: 38,
  height: 38,
  fontSize: '1.1rem',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0,0,0,.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
