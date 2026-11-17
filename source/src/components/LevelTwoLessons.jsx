import { useState } from 'react'
import { wordAudio } from '../data/audio.js'
import { levelTwoAdventure, levelTwoLessons } from '../data/level2Lessons.js'
import { playClip, cheer } from '../audio/engine.js'
import { heading, primaryButton, secondaryButton } from '../ui/tokens.js'

const colors = {
  ink: '#1a3a5c',
  blue: '#3a90c8',
  pale: '#aac5db',
  green: '#2e9e6e',
  red: '#e63946',
  card: 'rgba(255,255,255,.9)',
  border: '1.5px solid rgba(184,221,245,.8)',
}

const cardStyle = {
  background: colors.card,
  border: colors.border,
  borderRadius: 22,
  boxShadow: '0 4px 18px rgba(100,160,230,.14)',
}

const normalize = (text) =>
  text
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[\u0622\u0623\u0625]/g, 'ا')
    .replace(/[\u200c\s]/g, '')

function pronounce(text) {
  const key = normalize(text)
  const clip = wordAudio[text] || wordAudio[key]
  // Zeeba is the one known missing recording. Use browser speech instead.
  if (clip && clip !== 'Zeeba.m4a') {
    playClip(clip)
    return
  }
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'fa-IR'
  utterance.rate = 0.78
  window.speechSynthesis.speak(utterance)
}

function Header({ title, subtitle, onBack, color = colors.blue }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <button
        className="bb"
        onClick={onBack}
        style={{ ...secondaryButton, padding: '9px 18px', marginBottom: 14 }}
      >
        ← Back to Level 2
      </button>
      <h2 style={{ ...heading, fontSize: '1.55rem', color }}>{title}</h2>
      {subtitle && (
        <p style={{ textAlign: 'center', color: '#7ab5d9', fontSize: '.86rem', lineHeight: 1.5 }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

function SoundButton({ text, label = '🔊 Listen' }) {
  return (
    <button
      className="bb"
      onClick={() => pronounce(text)}
      aria-label={`Listen to ${text}`}
      style={{
        ...secondaryButton,
        padding: '8px 15px',
        fontSize: '.84rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {label}
    </button>
  )
}

function WordCard({ item }) {
  return (
    <div
      style={{
        ...cardStyle,
        padding: '22px 18px',
        textAlign: 'center',
        minHeight: 255,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
      }}
    >
      <div aria-hidden="true" style={{ fontSize: '2.3rem', lineHeight: 1.1 }}>
        {item.emoji}
      </div>
      <div
        lang="fa"
        dir="rtl"
        style={{
          fontFamily: "'Vazirmatn',serif",
          fontSize: '3rem',
          lineHeight: 1.35,
          fontWeight: 900,
          color: colors.ink,
        }}
      >
        {item.persian}
      </div>
      <div style={{ color: '#9b59b6', fontSize: '.92rem', fontStyle: 'italic' }}>
        Pronunciation: {item.pronunciation}
      </div>
      <div style={{ color: '#52708c', fontSize: '.9rem', fontWeight: 700 }}>
        English: {item.english}
      </div>
      <SoundButton text={item.persian} />
    </div>
  )
}

function ChoiceActivity({ activity, onComplete }) {
  const [selected, setSelected] = useState(null)
  const correct = selected === activity.answer

  const choose = (choice) => {
    setSelected(choice)
    if (choice === activity.answer) {
      cheer()
    }
  }

  return (
    <div style={{ ...cardStyle, padding: 20, marginBottom: 16, textAlign: 'center' }}>
      <div style={{ color: colors.blue, fontWeight: 900, marginBottom: 8 }}>{activity.prompt}</div>
      {activity.emoji && (
        <div aria-hidden="true" style={{ fontSize: '3rem', marginBottom: 10 }}>
          {activity.emoji}
        </div>
      )}
      {activity.listen && (
        <div style={{ marginBottom: 10 }}>
          <SoundButton text={activity.listen} label="🔊 Listen" />
        </div>
      )}
      {activity.promptPersian && (
        <div
          lang="fa"
          dir="rtl"
          style={{ fontFamily: "'Vazirmatn',serif", color: colors.ink, fontSize: '2rem', marginBottom: 12 }}
        >
          {activity.promptPersian}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(90px,1fr))', gap: 9 }}>
        {activity.choices.map((choice) => (
          <button
            key={choice}
            className="bb"
            onClick={() => choose(choice)}
            style={{
              ...secondaryButton,
              padding: '12px 8px',
              fontFamily: /[\u0600-\u06ff]/.test(choice) ? "'Vazirmatn',serif" : undefined,
              fontSize: /[\u0600-\u06ff]/.test(choice) ? '1.35rem' : '1rem',
              borderColor: selected === choice ? (correct ? colors.green : colors.red) : '#b8ddf5',
              background: selected === choice ? (correct ? '#e4f7eb' : '#fff0f0') : 'white',
            }}
          >
            {choice}
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ marginTop: 12, color: correct ? colors.green : colors.red, fontWeight: 900 }}>
          {correct ? 'آفرین! 🌟' : 'دوباره امتحان کن! ❤️'}
        </div>
      )}
      {correct && onComplete && (
        <button className="bb" onClick={onComplete} style={{ ...primaryButton, marginTop: 12 }}>
          Continue →
        </button>
      )}
    </div>
  )
}

function WordBuilder({ answer, prompt, onComplete }) {
  const tiles = Array.from(answer.replace(/\u200c/g, '')).map((letter, index) => ({
    id: index,
    letter,
  }))
  const scrambled = [...tiles].reverse()
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const built = selected.map((tileId) => tiles[tileId].letter).join('')
  const isCorrect = normalize(built) === normalize(answer)

  const choose = (tileId) => {
    setChecked(false)
    setSelected((current) => (current.includes(tileId) ? current : [...current, tileId]))
  }

  return (
    <div style={{ ...cardStyle, padding: 18, marginBottom: 14, textAlign: 'center' }}>
      <div style={{ color: colors.blue, fontWeight: 900, marginBottom: 9 }}>{prompt}</div>
      <div
        dir="rtl"
        lang="fa"
        aria-live="polite"
        style={{
          minHeight: 55,
          padding: '8px 12px',
          borderRadius: 14,
          background: '#f3f9fe',
          fontFamily: "'Vazirmatn',serif",
          color: colors.ink,
          fontSize: '2rem',
          marginBottom: 12,
        }}
      >
        {built || '　'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', direction: 'rtl' }}>
        {scrambled.map((tile) => (
          <button
            key={tile.id}
            className="bb"
            disabled={selected.includes(tile.id)}
            onClick={() => choose(tile.id)}
            style={{
              ...secondaryButton,
              width: 52,
              height: 56,
              padding: 4,
              fontFamily: "'Vazirmatn',serif",
              fontSize: '1.9rem',
              opacity: selected.includes(tile.id) ? 0.35 : 1,
            }}
          >
            {tile.letter}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        <button
          onClick={() => {
            setSelected([])
            setChecked(false)
          }}
          style={{ ...secondaryButton, padding: '8px 14px', fontSize: '.82rem' }}
        >
          Try again ↺
        </button>
        <button
          onClick={() => {
            setChecked(true)
            if (isCorrect) {
              cheer()
            }
          }}
          disabled={selected.length !== tiles.length}
          style={{ ...primaryButton, padding: '8px 14px', fontSize: '.82rem', opacity: selected.length === tiles.length ? 1 : 0.5 }}
        >
          Check
        </button>
      </div>
      {checked && (
        <div style={{ marginTop: 9, color: isCorrect ? colors.green : colors.red, fontWeight: 900 }}>
          {isCorrect ? 'آفرین! 🌟' : 'دوباره امتحان کن! ❤️'}
        </div>
      )}
      {checked && isCorrect && onComplete && (
        <button className="bb" onClick={onComplete} style={{ ...primaryButton, marginTop: 10 }}>
          Continue →
        </button>
      )}
    </div>
  )
}

function SentenceBuilder({ activity, onComplete }) {
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const built = selected.map((i) => activity.tiles[i]).join(' ')
  const isCorrect = normalize(built) === normalize(activity.answer)

  return (
    <div style={{ ...cardStyle, padding: 18, marginBottom: 14, textAlign: 'center' }}>
      <div style={{ color: colors.blue, fontWeight: 900, marginBottom: 10 }}>{activity.prompt}</div>
      <div dir="rtl" lang="fa" style={{ minHeight: 50, fontFamily: "'Vazirmatn',serif", color: colors.ink, fontSize: '1.8rem', marginBottom: 12 }}>
        {built || '　'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', direction: 'rtl' }}>
        {activity.tiles.map((tile, i) => (
          <button
            key={`${tile}-${i}`}
            disabled={selected.includes(i)}
            onClick={() => {
              setChecked(false)
              setSelected((current) => [...current, i])
            }}
            style={{ ...secondaryButton, padding: '9px 13px', fontFamily: "'Vazirmatn',serif", fontSize: '1.15rem', opacity: selected.includes(i) ? 0.35 : 1 }}
          >
            {tile}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        <button onClick={() => { setSelected([]); setChecked(false) }} style={{ ...secondaryButton, padding: '8px 14px', fontSize: '.82rem' }}>
          Try again ↺
        </button>
        <button onClick={() => setChecked(true)} disabled={selected.length !== activity.tiles.length} style={{ ...primaryButton, padding: '8px 14px', fontSize: '.82rem', opacity: selected.length === activity.tiles.length ? 1 : 0.5 }}>
          Check
        </button>
      </div>
      {checked && <div style={{ marginTop: 9, color: isCorrect ? colors.green : colors.red, fontWeight: 900 }}>{isCorrect ? 'آفرین! 🌟' : 'دوباره امتحان کن! ❤️'}</div>}
      {checked && isCorrect && onComplete && <button className="bb" onClick={onComplete} style={{ ...primaryButton, marginTop: 10 }}>Continue →</button>}
    </div>
  )
}

function SentenceCard({ sentence }) {
  return (
    <div style={{ ...cardStyle, padding: 20, textAlign: 'center', marginBottom: 16 }}>
      <div lang="fa" dir="rtl" style={{ fontFamily: "'Vazirmatn',serif", color: colors.ink, fontWeight: 900, fontSize: '2.25rem', lineHeight: 1.5 }}>
        {sentence.persian}
      </div>
      <div style={{ color: '#9b59b6', fontSize: '.9rem', fontStyle: 'italic', marginTop: 3 }}>
        Pronunciation: {sentence.pronunciation}
      </div>
      <div style={{ color: '#52708c', fontSize: '.88rem', marginTop: 3 }}>
        English: {sentence.english}
      </div>
      {sentence.emoji && <div style={{ fontSize: '2rem', marginTop: 8 }}>{sentence.emoji}</div>}
      <div style={{ marginTop: 10 }}><SoundButton text={sentence.persian} /></div>
    </div>
  )
}

function LessonWords({ lesson, onPractice, onBack }) {
  const [index, setIndex] = useState(0)
  const item = lesson.words[index]
  return (
    <div style={{ padding: '16px 16px 70px' }}>
      <Header title={`${lesson.emoji} Lesson ${lesson.id}: ${lesson.title}`} subtitle={lesson.fa} onBack={onBack} color="#2e9e6e" />
      <div style={{ background: 'rgba(255,255,255,.5)', borderRadius: 99, height: 8, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(90deg,#52b788,#3a90c8)', height: '100%', width: `${((index + 1) / lesson.words.length) * 100}%`, transition: 'width .3s' }} />
      </div>
      <div style={{ textAlign: 'center', color: colors.pale, fontSize: '.8rem', marginBottom: 12 }}>
        Word {index + 1} of {lesson.words.length}
      </div>
      <WordCard item={item} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
        <button onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0} style={{ ...secondaryButton, opacity: index === 0 ? 0.5 : 1 }}>
          ← Previous
        </button>
        {index < lesson.words.length - 1 ? (
          <button className="bb" onClick={() => setIndex((current) => current + 1)} style={primaryButton}>
            Next word →
          </button>
        ) : (
          <button className="bb" onClick={onPractice} style={primaryButton}>
            Practice these words →
          </button>
        )}
      </div>
    </div>
  )
}

function ReviewLesson({ onBack, onDone }) {
  const [step, setStep] = useState(0)
  const questions = [
    { kind: 'choice', prompt: 'Picture → word', emoji: '🐰', answer: 'خرگوش', choices: ['خرگوش', 'گربه', 'ماهی'] },
    { kind: 'choice', prompt: 'Word → picture: خرگوش', promptPersian: 'خرگوش', answer: '🐰', choices: ['🐰', '🐱', '🐟'] },
    { kind: 'build', prompt: 'Build a longer word', answer: 'کتابخانه' },
    { kind: 'build', prompt: 'Scrambled letters: ر / د / ا / م', answer: 'مادر' },
    { kind: 'choice', prompt: 'Complete the sentence: این ___ من است.', promptPersian: 'این ___ من است.', answer: 'مادر', choices: ['مادر', 'توپ', 'مدرسه'] },
    { kind: 'choice', prompt: 'Listen, then choose the word', listen: 'مدرسه', answer: 'مدرسه', choices: ['مدرسه', 'خانه', 'پارک'] },
  ]
  const current = questions[step]
  const next = () => {
    if (step === questions.length - 1) onDone()
    else setStep((value) => value + 1)
  }

  return (
    <div style={{ padding: '16px 16px 70px' }}>
      <Header title="🧩 Lesson 19: Review & Word Challenge" subtitle="You already know these words. Let’s play!" onBack={onBack} color="#9b59b6" />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 14 }}>
        {questions.map((_, index) => <span key={index} style={{ width: 9, height: 9, borderRadius: 20, background: index <= step ? '#9b59b6' : '#d7e6f2' }} />)}
      </div>
      {current.kind === 'build' ? (
        <WordBuilder answer={current.answer} prompt={current.prompt} onComplete={next} />
      ) : (
        <ChoiceActivity activity={current} onComplete={next} />
      )}
      <div style={{ ...cardStyle, padding: 14, marginTop: 12 }}>
        <div style={{ color: colors.blue, fontWeight: 900, marginBottom: 5 }}>More words to revisit</div>
        <div lang="fa" dir="rtl" style={{ fontFamily: "'Vazirmatn',serif", color: colors.ink, lineHeight: 1.9 }}>
          مدرسه · مادربزرگ · کتابخانه · آشپزخانه · هواپیما · آتش‌نشان · اسباب‌بازی
        </div>
      </div>
    </div>
  )
}

function GraduationLesson({ onBack, onDone }) {
  const [index, setIndex] = useState(0)
  const sentence = levelTwoLessons.find((lesson) => lesson.id === 20).sentences[index]
  const last = index === 7

  return (
    <div style={{ padding: '16px 16px 70px' }}>
      <Header title="🌟 Lesson 20: My First Persian Sentences" subtitle="Read each sentence and listen to it." onBack={onBack} color="#e67e22" />
      <div style={{ textAlign: 'center', color: colors.pale, fontSize: '.8rem', marginBottom: 12 }}>Sentence {index + 1} of 8</div>
      <SentenceCard sentence={sentence} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 9 }}>
        <button onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0} style={{ ...secondaryButton, opacity: index === 0 ? 0.5 : 1 }}>← Previous</button>
        {last ? (
          <button className="bb" onClick={onDone} style={primaryButton}>Finish Level 2 🌟</button>
        ) : (
          <button className="bb" onClick={() => setIndex((current) => current + 1)} style={primaryButton}>Next sentence →</button>
        )}
      </div>
    </div>
  )
}

function Adventure({ onBack, onFinish }) {
  const [step, setStep] = useState(0)
  const stage = levelTwoAdventure.stages[step]
  const next = () => {
    if (step === levelTwoAdventure.stages.length - 1) onFinish()
    else setStep((value) => value + 1)
  }

  return (
    <div style={{ padding: '16px 16px 70px' }}>
      <Header title={`🗺️ ${levelTwoAdventure.title}`} subtitle={levelTwoAdventure.fa} onBack={onBack} color="#9b59b6" />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 14 }}>
        {levelTwoAdventure.stages.map((_, index) => <span key={index} style={{ width: 10, height: 10, borderRadius: 20, background: index <= step ? '#9b59b6' : '#d7e6f2' }} />)}
      </div>
      {step === 1 ? (
        <WordBuilder answer={stage.answer} prompt={`${stage.title}: ${stage.prompt}`} onComplete={next} />
      ) : step === 3 ? (
        <SentenceBuilder activity={stage} onComplete={next} />
      ) : (
        <ChoiceActivity
          activity={{ ...stage, prompt: `${stage.title}: ${stage.prompt}`, promptPersian: stage.listen ? stage.listen : undefined, listen: stage.listen }}
          onComplete={next}
        />
      )}
      <div style={{ textAlign: 'center', marginTop: 12, color: colors.pale, fontSize: '.8rem' }}>
        Stage {step + 1} of {levelTwoAdventure.stages.length}
      </div>
    </div>
  )
}

export default function LevelTwoLessons({ onBack }) {
  const [lesson, setLesson] = useState(null)
  const [practice, setPractice] = useState(false)
  const [celebration, setCelebration] = useState(false)
  const [adventure, setAdventure] = useState(false)

  const reset = () => {
    setLesson(null)
    setPractice(false)
    setCelebration(false)
    setAdventure(false)
  }

  if (adventure) {
    return (
      <Adventure
        onBack={() => setAdventure(false)}
        onFinish={() => { setAdventure(false); setCelebration(true) }}
      />
    )
  }

  if (celebration) {
    const award = levelTwoAdventure.celebration
    return (
      <div style={{ padding: '30px 18px 70px', textAlign: 'center' }}>
        <div style={{ ...cardStyle, maxWidth: 410, margin: '0 auto', padding: 26 }}>
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>🎉 🌟</div>
          <div lang="fa" dir="rtl" style={{ fontFamily: "'Vazirmatn',serif", fontSize: '2.5rem', fontWeight: 900, color: colors.green }}>
            {award.persian}
          </div>
          <div style={{ color: '#9b59b6', marginTop: 5 }}>Pronunciation: {award.pronunciation}</div>
          <div style={{ color: '#52708c', marginTop: 3 }}>English: {award.english}</div>
          <div lang="fa" dir="rtl" style={{ fontFamily: "'Vazirmatn',serif", fontSize: '1.7rem', fontWeight: 900, color: colors.ink, marginTop: 20 }}>
            {award.learned}
          </div>
          <div style={{ color: '#9b59b6', marginTop: 5 }}>Pronunciation: {award.learnedPronunciation}</div>
          <div style={{ color: '#52708c', marginTop: 3 }}>English: {award.learnedEnglish}</div>
          <button className="bb" onClick={() => { setCelebration(false); setAdventure(false); setLesson(null); setPractice(false) }} style={{ ...primaryButton, marginTop: 20 }}>
            Back to Level 2
          </button>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div style={{ padding: '16px 16px 70px' }}>
        <Header title="📚 Level 2 — Words & Sentences" subtitle="A fun Persian classroom: read, listen, build words, and make your first sentences." onBack={onBack} color="#2e9e6e" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {levelTwoLessons.map((item) => (
            <button
              key={item.id}
              className="lift"
              onClick={() => {
                setLesson(item)
                setPractice(false)
                if (item.id === 19) setPractice(true)
                if (item.id === 20) setPractice(true)
              }}
              style={{ ...cardStyle, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 13, textAlign: 'left', borderLeft: '5px solid #52b788' }}
            >
              <span aria-hidden="true" style={{ fontSize: '1.8rem', width: 40, textAlign: 'center' }}>{item.emoji}</span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontWeight: 900, color: colors.ink }}>Lesson {item.id}: {item.title}</span>
                <span lang="fa" dir="rtl" style={{ display: 'block', fontFamily: "'Vazirmatn',serif", fontSize: '.95rem', color: colors.green, marginTop: 2 }}>{item.fa}</span>
                <span style={{ display: 'block', color: colors.pale, fontSize: '.73rem', marginTop: 2 }}>
                  {item.words ? `${item.words.length} words · Listen and practice` : item.review ? 'Review games · 6 stages' : '8 short sentences · Graduation'}
                </span>
              </span>
              <span style={{ color: colors.green, fontSize: '1.4rem', fontWeight: 900 }}>›</span>
            </button>
          ))}
        </div>
        <button className="bb" onClick={() => { setAdventure(true); setCelebration(false) }} style={{ ...primaryButton, display: 'block', margin: '18px auto 0', background: 'linear-gradient(135deg,#9b59b6,#7141a1)' }}>
          🗺️ Play Persian Adventure
        </button>
      </div>
    )
  }

  if (lesson.id === 19) {
    return <ReviewLesson onBack={reset} onDone={() => setCelebration(true)} />
  }

  if (lesson.id === 20) {
    return <GraduationLesson onBack={reset} onDone={() => setCelebration(true)} />
  }

  if (!practice) {
    return (
      <LessonWords
        key={lesson.id}
        lesson={lesson}
        onBack={reset}
        onPractice={() => setPractice(true)}
      />
    )
  }

  return (
    <div style={{ padding: '16px 16px 70px' }}>
      <Header title={`${lesson.emoji} Lesson ${lesson.id}: ${lesson.title}`} subtitle="Try the activity, then finish with a cheer." onBack={reset} color="#2e9e6e" />
      {(lesson.assembly || []).map((answer, index) => {
        const clue = lesson.words.find((item) => item.persian === answer)
        return (
          <WordBuilder
            key={`${answer}-${index}`}
            answer={answer}
            prompt={clue ? `Build ${clue.emoji} · ${clue.english}` : `Build word ${index + 1} of ${lesson.assembly.length}`}
            onComplete={null}
          />
        )
      })}
      {lesson.sentenceBuild && (
        <SentenceBuilder
          activity={{
            prompt: 'Arrange the cards to make the sentence',
            answer: `${lesson.sentenceBuild.join(' ')}.`,
            tiles: [...lesson.sentenceBuild].reverse(),
          }}
          onComplete={null}
        />
      )}
      {lesson.quiz && <ChoiceActivity activity={lesson.quiz} onComplete={null} />}
      {lesson.sentence && (
        <>
          <h3 style={{ ...heading, fontSize: '1.25rem', marginTop: 20 }}>Mini sentence</h3>
          <SentenceCard sentence={lesson.sentence} />
        </>
      )}
      <div style={{ ...cardStyle, textAlign: 'center', padding: 18, marginTop: 16 }}>
        <div lang="fa" dir="rtl" style={{ fontFamily: "'Vazirmatn',serif", fontSize: '1.7rem', fontWeight: 900, color: colors.green }}>
          آفرین! 🌟
        </div>
        <div style={{ color: '#9b59b6', fontSize: '.85rem', marginTop: 4 }}>Pronunciation: āfarin</div>
        <div style={{ color: '#52708c', fontSize: '.85rem', marginTop: 2 }}>English: Great job!</div>
        <button className="bb" onClick={() => { setLesson(null); setPractice(false) }} style={{ ...primaryButton, marginTop: 14 }}>
          Back to lessons
        </button>
      </div>
    </div>
  )
}
