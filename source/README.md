# Source project

The app used to exist only as a built `index.html` at the repo root with no
source. This is the source, mid-migration.

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # -> dist/index.html, one self-contained file
npm run deploy   # copies dist/index.html over the repo root index.html
```

`npm run deploy` is a publish: the repo root `index.html` is what GitHub Pages
serves. It is a separate command on purpose.

The dev server serves the `.m4a` and `.mp3` files from the repo root, so audio
works in dev without copying 372 files around.

## State of the migration

| Area | Where it lives |
| --- | --- |
| All data: letters, quizzes, audio maps, levels | `src/data/` — rewritten, readable |
| Audio engine | `src/audio/engine.js` — rewritten, documented |
| Stylesheet | `src/styles.css` — real file |
| App shell, music player, volume panel | `src/App.jsx` — rewritten |
| Home screen | `src/components/Home.jsx` — rewritten |
| Letter detail screen | `src/components/LetterDetail.jsx` — rewritten |
| Lesson list, level grid, quiz, writing, games, background | `src/legacy/screens.js` — still compiled |

`src/legacy/screens.js` is the original compiled code, lifted across so the
whole app runs from source today. It is **not** a dead copy:

- its data comes from `src/data`, so that directory is the single source of
  truth and editing it changes the legacy screens too
- its clip playback delegates to `src/audio/engine.js`, so there is one
  duck/restore implementation

Migrate by lifting one screen out of `src/legacy/screens.js` into a real
component and deleting what stops being referenced. The build stays green
throughout.

`src/components/LetterDetail.jsx` is the worked example. It was the minified
`gm` inside `screens.js`; the steps were:

1. Write the component properly in `src/components/`, taking the same props
   the minified version took (`letterData`, `onBack`, `onNext`).
2. Delete the `function gm(...)` from `screens.js`.
3. Add `import gm from '../components/LetterDetail.jsx'` there, so the screens
   that render `gm` pick up the new one with no other change.
4. Rebuild and click through the screen, including anything unusual it
   handles. For that one it was the خوا cluster highlight and the shadda rows,
   which are the parts a rewrite would quietly get wrong.

Good next candidates, in order: the level grid (`xm`), the lesson list (`ym`),
then the quiz (`pm`). Leave the six games for last; they are the largest and
the least likely to need editing.

## Editing content

Almost everything worth changing is data, and lives in `src/data/`:

- `letters.js` — the 40 letters, their forms, example words and red highlights
- `checkpoints.js` — the 20 quizzes, their words, tiles, recordings, pictures
- `audio.js` — which recording each letter and word uses
- `writingWords.js`, `alphabet.js`, `levels.js`

Read the comments at the top of `audio.js` before touching filenames. Some of
them store their macrons decomposed and will 404 silently if "cleaned up".
