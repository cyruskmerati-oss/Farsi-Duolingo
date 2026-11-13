import { useEffect, useRef, useState } from 'react'
import Home from './components/Home.jsx'
import {
  Alphabet,
  Games,
  LessonMode,
  QuizSection,
  SkyScene,
  WordWriting,
} from './legacy/screens.js'
import { baseVolume, initGraph, registerMusic, setBaseVolume, setVolume } from './audio/engine.js'
import { roundIcon } from './ui/tokens.js'

const PLAYLIST = ['Khoone%20Bozorge.mp3', 'Softer%20Treble.mp3']

export default function App() {
  const [screen, setScreen] = useState('home')
  const [muted, setMuted] = useState(false)
  const [volume, setVol] = useState(baseVolume)
  const [panelOpen, setPanelOpen] = useState(false)
  const music = useRef(null)
  const track = useRef(0)

  // One element, two tracks, cycled. Playback is attempted immediately and
  // again on the first gesture, because browsers block unprompted audio.
  useEffect(() => {
    const el = new Audio(PLAYLIST[0])
    el.preload = 'auto'
    setVolume(el, baseVolume)
    music.current = el
    registerMusic(el)

    const next = () => {
      track.current = (track.current + 1) % PLAYLIST.length
      el.src = PLAYLIST[track.current]
      el.play().catch(() => {})
    }
    el.addEventListener('ended', next)
    el.play().catch(() => {})

    const onGesture = () => {
      initGraph(el)
      el.play().catch(() => {})
      document.removeEventListener('click', onGesture)
      document.removeEventListener('touchstart', onGesture)
    }
    document.addEventListener('click', onGesture)
    document.addEventListener('touchstart', onGesture)

    return () => {
      el.pause()
      el.removeEventListener('ended', next)
      document.removeEventListener('click', onGesture)
      document.removeEventListener('touchstart', onGesture)
    }
  }, [])

  useEffect(() => {
    if (music.current) music.current.muted = muted
  }, [muted])

  useEffect(() => {
    setBaseVolume(volume)
  }, [volume])

  useEffect(() => {
    if (!panelOpen) return
    const close = () => setPanelOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [panelOpen])

  return (
    <>
      <button
        title="Sound"
        onClick={(e) => {
          e.stopPropagation()
          if (music.current) {
            initGraph(music.current)
            music.current.play().catch(() => {})
          }
          setPanelOpen((o) => !o)
        }}
        style={{ ...roundIcon, right: 14 }}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {panelOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: 58,
            right: 14,
            zIndex: 9999,
            width: 198,
            background: 'rgba(255,255,255,.97)',
            borderRadius: 16,
            padding: '12px 14px',
            boxShadow: '0 8px 24px rgba(40,90,150,.22)',
            border: '1.5px solid #b8ddf5',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <button
            onClick={() => setMuted((m) => !m)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              background: muted ? 'rgba(230,57,70,.12)' : 'rgba(58,144,200,.12)',
              border: `1.5px solid ${muted ? 'rgba(230,57,70,.35)' : 'rgba(58,144,200,.3)'}`,
              borderRadius: 12,
              padding: '8px 10px',
              fontSize: '.85rem',
              fontWeight: 800,
              color: muted ? '#e63946' : '#3a90c8',
              cursor: 'pointer',
            }}
          >
            {muted ? '🔇' : '🔊'}
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '.95rem', opacity: muted ? 0.4 : 1 }}>🔈</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              disabled={muted}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: '#3a90c8', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '.95rem', opacity: muted ? 0.4 : 1 }}>🔊</span>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '.72rem',
              fontWeight: 800,
              color: muted ? '#c8dff0' : '#7ab5d9',
            }}
          >
            {muted ? 'Muted' : `${Math.round(volume * 100)}%`}
          </div>
        </div>
      )}

      {screen !== 'home' && (
        <button
          onClick={() => setScreen('home')}
          title="Main menu"
          style={{ ...roundIcon, right: 60 }}
        >
          🏠
        </button>
      )}

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <SkyScene />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 520,
            margin: '0 auto',
            minHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          {screen === 'home' && <Home setScreen={setScreen} />}
          {screen === 'lessons' && <LessonMode onBack={() => setScreen('home')} />}
          {screen === 'writing' && <WordWriting onBack={() => setScreen('home')} />}
          {screen === 'quiz' && <QuizSection onBack={() => setScreen('home')} />}
          {screen === 'games' && <Games onBack={() => setScreen('home')} />}
          {screen === 'alphabet' && <Alphabet onBack={() => setScreen('home')} />}
        </div>
      </div>
    </>
  )
}
