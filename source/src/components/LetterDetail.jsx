import { useState } from 'react'
import BackHeader from './BackHeader.jsx'
import Card from './Card.jsx'
import { playClip } from '../audio/engine.js'
import { letterClip, wordClip } from '../data/lookup.js'
import { primaryButton } from '../ui/tokens.js'

/**
 * Which forms this letter teaches, in the order they are shown.
 *
 * Most letters have initial/medial/final. The vowel marks instead carry a
 * `custom` list, and a couple of entries use upper/lower. Forms with no glyph
 * are dropped, which is why ب shows three rows and ا shows two.
 */
function formsOf(entry) {
  const { forms } = entry
  if (forms.custom?.length) return forms.custom
  if (forms.upper && forms.lower) {
    return [
      { key: 'upper', label: forms.upperLabel || 'Uppercase', form: forms.upper, exIdx: 0 },
      { key: 'lower', label: forms.lowerLabel || 'Lowercase', form: forms.lower, exIdx: 1 },
    ].filter((f) => f.form)
  }
  return [
    { key: 'initial', label: forms.initialLabel || 'Initial', form: forms.initial, exIdx: 0 },
    { key: 'medial', label: forms.medialLabel || 'Medial', form: forms.medial, exIdx: 1 },
    { key: 'final', label: forms.finalLabel || 'Final', form: forms.final, exIdx: 2 },
  ].filter((f) => f.form)
}

/**
 * Which characters of `word` to colour red.
 *
 * An array highlights each listed character wherever it appears. A string
 * highlights contiguous runs of itself, which is what lets خوا mark the whole
 * cluster in استخوان without catching the unrelated alef at the front.
 */
function highlightMask(word, highlight) {
  const chars = [...word]
  const mask = new Array(chars.length).fill(false)
  if (Array.isArray(highlight)) {
    chars.forEach((c, i) => {
      if (highlight.includes(c)) mask[i] = true
    })
  } else if (highlight) {
    let at = word.indexOf(highlight)
    while (at >= 0) {
      for (let k = 0; k < highlight.length; k++) mask[at + k] = true
      at = word.indexOf(highlight, at + 1)
    }
  }
  return mask
}

function ExampleWord({ example }) {
  const chars = [...example.word]
  const mask = highlightMask(example.word, example.highlight)
  return (
    <div
      style={{
        direction: 'rtl',
        fontFamily: "'Vazirmatn',serif",
        fontSize: '2rem',
        fontWeight: 900,
        flex: 1,
      }}
    >
      {chars.map((ch, i) => (
        <span key={i} style={{ color: mask[i] ? '#e63946' : '#1a3a5c' }}>
          {ch}
        </span>
      ))}
    </div>
  )
}

const speakerButton = {
  background: 'rgba(58,144,200,.12)',
  border: '1.5px solid rgba(58,144,200,.3)',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}

export default function LetterDetail({ letterData, onBack, onNext }) {
  const [revealed, setRevealed] = useState(() => new Set())
  const forms = formsOf(letterData)
  const allRevealed = revealed.size >= forms.length
  const remaining = forms.length - revealed.size
  const clip = letterClip(letterData)

  return (
    <div style={{ padding: '16px 16px 80px', animation: 'fadeUp .4s ease both' }}>
      <BackHeader onBack={onBack} />

      <Card
        style={{
          padding: '20px',
          marginBottom: 14,
          textAlign: 'center',
          background: 'linear-gradient(135deg,rgba(255,255,255,.95),rgba(240,248,255,.95))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div
            style={{
              fontFamily: "'Vazirmatn',serif",
              fontSize: '6rem',
              color: '#1a3a5c',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {letterData.letter}
          </div>
          {clip && (
            <button
              onClick={() => playClip(clip)}
              style={{ ...speakerButton, width: 44, height: 44, fontSize: '1.3rem' }}
            >
              🔊
            </button>
          )}
        </div>
        <div style={{ fontWeight: 800, color: '#3a90c8', fontSize: '1.15rem', marginBottom: 3 }}>
          {letterData.name}
        </div>
        <div style={{ color: '#9b59b6', fontStyle: 'italic' }}>/{letterData.roman}/</div>
      </Card>

      <div
        style={{
          fontSize: '.7rem',
          color: '#aac5db',
          textTransform: 'uppercase',
          letterSpacing: 2,
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        Tap each form to see an example
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {forms.map((form) => {
          const open = revealed.has(form.key)
          const example = letterData.examples[form.exIdx]
          const exampleClip = wordClip(example.word)
          const speak = () => playClip(exampleClip)

          return (
            <div key={form.key}>
              <button
                onClick={() => {
                  setRevealed((prev) => new Set([...prev, form.key]))
                  speak()
                }}
                style={{
                  width: '100%',
                  background: open
                    ? 'linear-gradient(135deg,rgba(58,144,200,.18),rgba(58,144,200,.08))'
                    : 'rgba(255,255,255,.9)',
                  borderRadius: 16,
                  padding: '14px 18px',
                  border: open ? '2px solid rgba(58,144,200,.4)' : '1.5px solid #b8ddf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 10px rgba(100,160,230,.12)',
                  transition: 'all .2s',
                  cursor: 'pointer',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: '.65rem',
                      color: '#aac5db',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      marginBottom: 3,
                    }}
                  >
                    {form.label} form
                  </div>
                  <div
                    style={{
                      fontFamily: "'Vazirmatn',serif",
                      fontSize: '2.4rem',
                      color: '#1a3a5c',
                      fontWeight: 900,
                      lineHeight: 1,
                    }}
                  >
                    {form.form}
                  </div>
                </div>
                <div style={{ fontSize: '1.2rem', color: open ? '#3a90c8' : '#c8dff0' }}>
                  {open ? '✓' : '👆'}
                </div>
              </button>

              {/* Collapsed to zero height rather than unmounted, so the reveal animates. */}
              <div
                style={{
                  maxHeight: open ? '100px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height .4s ease',
                  marginTop: open ? 6 : 0,
                }}
              >
                <Card
                  onClick={speak}
                  style={{
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    background: 'rgba(240,248,255,.92)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                    {exampleClip && (
                      <button
                        // The whole bar speaks, so stop this from firing twice.
                        onClick={(e) => {
                          e.stopPropagation()
                          speak()
                        }}
                        style={{ ...speakerButton, width: 36, height: 36, fontSize: '1rem' }}
                      >
                        🔊
                      </button>
                    )}
                    <ExampleWord example={example} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#1a3a5c', fontSize: '.9rem' }}>
                      {example.meaning}
                    </div>
                    <div style={{ color: '#9b59b6', fontStyle: 'italic', fontSize: '.75rem' }}>
                      {example.roman}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )
        })}
      </div>

      {allRevealed ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="bb"
            onClick={onNext}
            style={{ ...primaryButton, fontSize: '1rem', padding: '12px 28px' }}
          >
            Next Letter →
          </button>
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            color: '#aac5db',
            fontSize: '.82rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          Tap all {remaining} remaining form{remaining !== 1 ? 's' : ''} to continue
        </div>
      )}
    </div>
  )
}
