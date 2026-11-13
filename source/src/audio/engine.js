// Audio engine.
//
// Everything here exists because of a specific failure. Read the notes before
// simplifying any of it.
//
// 1. iOS Safari treats HTMLMediaElement.volume as read only. Setting it is
//    silently ignored, so volume runs through Web Audio gain nodes instead.
//    Gain is settable everywhere, and unlike .volume it can exceed 1.
// 2. An AudioContext cannot start outside a user gesture, so the graph is
//    built from the first click or touch.
// 3. Clips are cached one element per file and capped. Reassigning src on a
//    shared element makes the browser fire a spurious error and reject the
//    pending play(), both of which read as "clip finished" and un-ducked the
//    music mid word. Caching all 250 clips instead made iPhones crawl.

const CLIP_GAIN = 1.8 // pronunciation clips, relative to the recording
const DUCK_RATIO = 0.05 // music level while a clip plays, relative to base
const MAX_CLIPS = 8
const WATCHDOG_MS = 10000

let ctx = null
let music = null
let current = null
let seq = 0
let watchdog = null
const clips = new Map() // src -> element, insertion ordered, used as an LRU

export let baseVolume = 0.4

const clamp = (v) => (v > 1 ? 1 : v < 0 ? 0 : v)

/** Clip URL. Filenames keep their exact bytes; only encoding is applied. */
export const clipUrl = (file) => encodeURIComponent(file)

function applyGain(el, v) {
  const g = el.__gain
  try {
    g.gain.setTargetAtTime(v, g.context.currentTime, 0.05)
    return true
  } catch {
    try {
      g.gain.value = v
      return true
    } catch {
      return false
    }
  }
}

/** Set an element's level. Falls back to .volume where Web Audio is absent. */
export function setVolume(el, v) {
  if (!el) return
  el.__wanted = v
  if (el.__gain && applyGain(el, v)) return
  try {
    el.volume = clamp(v)
  } catch {
    /* iOS ignores this, which is the whole reason for the gain node */
  }
}

/**
 * Route an element through the shared context. Must be called from a user
 * gesture. `limit` adds a limiter so a gain above 1 cannot clip a recording
 * that was already near full scale.
 */
export function initGraph(el, limit) {
  if (!el) return
  if (el.__gain !== undefined) {
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {})
    return
  }
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) throw new Error('no Web Audio')
    ctx = ctx || new AC()
    const gain = ctx.createGain()
    const source = ctx.createMediaElementSource(el)
    source.connect(gain)
    if (limit) {
      const comp = ctx.createDynamicsCompressor()
      comp.threshold.value = -3
      comp.knee.value = 0
      comp.ratio.value = 20
      comp.attack.value = 0.003
      comp.release.value = 0.1
      gain.connect(comp)
      comp.connect(ctx.destination)
      el.__comp = comp
    } else {
      gain.connect(ctx.destination)
    }
    gain.gain.value = el.__wanted != null ? el.__wanted : 1
    el.__gain = gain
    el.__source = source
    el.volume = 1 // gain is the only control from here on
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  } catch {
    el.__gain = null // fall back to .volume
  }
}

function release(src) {
  const el = clips.get(src)
  if (!el) return
  try {
    el.pause()
  } catch {}
  el.onended = null
  el.onerror = null
  for (const node of [el.__source, el.__gain, el.__comp]) {
    try {
      node && node.disconnect()
    } catch {}
  }
  try {
    el.removeAttribute('src')
    el.load()
  } catch {}
  clips.delete(src)
}

function clipFor(src) {
  const existing = clips.get(src)
  if (existing) {
    clips.delete(src) // reinsert so it counts as most recently used
    clips.set(src, existing)
    return existing
  }
  for (const key of [...clips.keys()]) {
    if (clips.size < MAX_CLIPS) break
    if (clips.get(key) === current) continue // never evict what is playing
    release(key)
  }
  const el = new Audio(src)
  el.preload = 'auto'
  setVolume(el, CLIP_GAIN)
  clips.set(src, el)
  return el
}

/** The music element, so clips can duck it. */
export function registerMusic(el) {
  music = el
}

/** Listener's chosen music level. The duck is relative to it. */
export function setBaseVolume(v) {
  baseVolume = v
  if (music) setVolume(music, v)
}

/**
 * Play a pronunciation clip: duck the music, play boosted, restore when the
 * clip ends. A new clip cancels the one before it, and only the newest clip
 * restores the music.
 */
export function playClip(file) {
  if (!file) return
  try {
    const el = clipFor(clipUrl(file))
    initGraph(el, true)
    if (current && current !== el) {
      current.onended = null
      current.pause()
    }
    current = el
    const mine = ++seq
    const restore = () => {
      if (mine === seq && music) setVolume(music, baseVolume)
    }
    if (music) setVolume(music, baseVolume * DUCK_RATIO)
    el.onended = restore
    el.onerror = null // the src-change error is not a finished clip
    if (el.readyState) el.currentTime = 0
    el.play().catch(restore)
    clearTimeout(watchdog)
    watchdog = setTimeout(restore, WATCHDOG_MS)
  } catch {
    if (music) setVolume(music, baseVolume)
  }
}

/** A short rising arpeggio for a correct answer. No asset needed. */
export function cheer() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    ctx = ctx || new AC()
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    const t0 = ctx.currentTime
    for (const [i, freq] of [523.25, 659.25, 783.99, 1046.5].entries()) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const at = t0 + i * 0.085
      osc.type = 'triangle'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, at)
      gain.gain.exponentialRampToValueAtTime(0.22, at + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(at)
      osc.stop(at + 0.32)
    }
  } catch {}
}
