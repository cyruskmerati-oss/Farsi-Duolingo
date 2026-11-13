const sections = [
  {
    id: 'lessons',
    emoji: '📚',
    title: 'Lessons',
    fa: 'درس‌ها',
    sub: '5 levels · Learn each letter with forms, examples & mini quiz!',
    color: '#2e9e6e',
    delay: '.03s',
  },
  {
    id: 'writing',
    emoji: '✍️',
    title: 'Word Writing',
    fa: 'نوشتن',
    sub: 'Letters connected in real words, target highlighted red',
    color: '#9b59b6',
    delay: '.13s',
  },
  {
    id: 'quiz',
    emoji: '🎯',
    title: 'Quiz',
    fa: 'آزمون',
    sub: 'Test your Farsi vocabulary with multiple choice questions',
    color: '#e67e22',
    delay: '.18s',
  },
  {
    id: 'games',
    emoji: '🎮',
    title: 'Games',
    fa: 'بازی‌ها',
    sub: '6 games: Letter Hunt, Word Hunt, Word Building, River Cannon, Fruit Catcher & Spinning Wheel!',
    color: '#e63946',
    delay: '.23s',
  },
]

export default function Home({ setScreen }) {
  return (
    <div style={{ padding: '0 20px 60px', maxWidth: 480, margin: '0 auto' }}>
      <div
        style={{
          textAlign: 'center',
          paddingTop: 50,
          paddingBottom: 8,
          animation: 'fadeDown .7s ease both',
        }}
      >
        <div
          style={{
            fontSize: '.7rem',
            color: '#7ab5d9',
            letterSpacing: 8,
            textTransform: 'uppercase',
            marginBottom: 12,
            fontWeight: 800,
          }}
        >
          — Learn Persian —
        </div>
        <div
          style={{
            fontFamily: "'Vazirmatn',serif",
            fontSize: '4.8rem',
            color: '#1a3a5c',
            textShadow: '0 4px 20px rgba(58,144,200,.2)',
            lineHeight: 1,
            letterSpacing: 6,
            marginBottom: 6,
          }}
        >
          فارسی
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3a90c8', letterSpacing: 4 }}>
          Fārsi
        </div>
        <div style={{ marginTop: 12, fontSize: '2rem' }}>☀️</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 22 }}>
        {sections.map((s) => (
          <button
            key={s.id}
            className="lift"
            onClick={() => setScreen(s.id)}
            style={{
              background: 'rgba(255,255,255,.82)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1.5px solid rgba(255,255,255,.95)',
              borderLeft: `5px solid ${s.color}`,
              borderRadius: 22,
              padding: '17px 18px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: '0 4px 18px rgba(100,160,230,.14)',
              transition: 'all .22s ease',
              animation: `fadeUp .5s ${s.delay} ease both`,
            }}
          >
            <div style={{ fontSize: '2.3rem', minWidth: 46, textAlign: 'center', lineHeight: 1 }}>
              {s.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                <span style={{ fontWeight: 900, color: '#1a3a5c', fontSize: '1.18rem' }}>
                  {s.title}
                </span>
                <span
                  style={{ fontFamily: "'Vazirmatn',serif", color: '#aac5db', fontSize: '.92rem' }}
                >
                  {s.fa}
                </span>
              </div>
              <div style={{ color: '#7ab5d9', fontSize: '.8rem', lineHeight: 1.45 }}>{s.sub}</div>
            </div>
            <div style={{ color: s.color, fontSize: '1.5rem', flexShrink: 0, fontWeight: 900 }}>
              ›
            </div>
          </button>
        ))}
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: 28,
          color: '#aac5db',
          fontSize: '.78rem',
          letterSpacing: 1,
        }}
      >
        سلام · خوش آمدید 🌸
      </div>
    </div>
  )
}
