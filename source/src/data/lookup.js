import { letterAudioByName, letterAudioByChar, wordAudio } from './audio.js'

/**
 * Fold a word to its audio-map key: strip harakat and the superscript alef,
 * and collapse آ أ إ to bare ا. Must stay in step with the keys in wordAudio.
 */
export const normaliseWord = (word) =>
  word.replace(/[ً-ٰٟ]/g, '').replace(/[آأإ]/g, 'ا')

/**
 * Clip for a lesson entry. Keyed by name first: ی and و each appear twice in
 * Level 1 as different letters with different recordings, which a key on the
 * glyph alone cannot express.
 */
export const letterClip = (entry) =>
  entry ? letterAudioByName[entry.name] || letterAudioByChar[entry.letter] : undefined

/** Clip for an example word. */
export const wordClip = (word) => (word ? wordAudio[normaliseWord(word)] : undefined)
