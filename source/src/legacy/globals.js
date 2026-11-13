// The legacy screens still reach for a few helpers on `window`, the way the
// old inline <script> provided them. Point those at the ported engine so
// there is exactly one implementation, not a copy that can drift.
//
// Delete each line as the last legacy caller is replaced.
import { cheer, initGraph, setBaseVolume, setVolume, baseVolume } from '../audio/engine.js'

window.__fdSetVol = setVolume
window.__fdInit = initGraph
window.__fdCheer = cheer

Object.defineProperty(window, '__fdBase', {
  get: () => baseVolume,
  set: (v) => setBaseVolume(v),
  configurable: true,
})
