# Working on this repo

Instructions for coding agents (Codex, Claude Code) and for anyone editing by
hand. Read this before changing anything.

## What this is

A single page Farsi learning app for children: letter lessons, word building
quizzes, writing animations and games, with recorded pronunciation for every
letter and word.

- Live at https://cyruskmerati-oss.github.io/Farsi-Duolingo/
- GitHub Pages serves the `main` branch from the repo root.
- **Every push to `main` goes live within a couple of minutes.** There is no
  staging site.

## Read this first: there are two trees

```
index.html     <- what GitHub Pages actually serves. A 301 KB minified build.
source/        <- the real source project. Builds back to that same file.
```

**They are not linked yet.** The shipped `index.html` is still the original
hand-edited bundle; nothing has been generated from `source/` and published.
Switching the deploy over is a deliberate step that has not been taken.

So the rule, until that switch happens:

> **Make a change in one tree, never both.** Prefer `source/`, then publish
> with `npm run deploy`. If you hand-edit `index.html` instead, `source/`
> silently falls behind and the next deploy from source will revert you.

If you are unsure which applies, ask rather than guessing. Reverting a
clobbered deploy is much more work than a question.

## Working in `source/` (preferred)

```bash
cd source
npm install
npm run dev      # http://localhost:5180
npm run build    # -> dist/index.html, one self-contained file
npm run deploy   # copies dist/index.html over the repo root index.html
```

`npm run deploy` is a publish, which is why it is not part of `build`. The dev
server serves the `.m4a` and `.mp3` files from the repo root, so audio works in
dev without duplicating 372 files.

### Where things are

| | |
| --- | --- |
| `source/src/data/` | **All content.** Letters, quizzes, audio maps, levels. Readable and commented. |
| `source/src/audio/engine.js` | Playback, ducking, volume, the cheer. Documented. |
| `source/src/App.jsx` | Shell, music player, volume panel, routing |
| `source/src/components/` | Rewritten screens (Home so far) |
| `source/src/legacy/screens.js` | Screens not yet rewritten, still compiled |
| `source/src/styles.css` | The stylesheet and its keyframes |

Nearly every content change is a data change in `source/src/data/`:

- `letters.js` sets the 40 letters, their forms, example words and the red
  `highlight`. A string highlight matches a contiguous run (`"خوا"`), an array
  matches individual characters.
- `checkpoints.js` sets the 20 quizzes: `triggerAfter` is the letter index the
  quiz follows, `letters` is the tile order (the quiz does **not** shuffle, so
  list them scrambled), `audio` is the recording, `pic` is the emoji.
- `audio.js` maps letters and words to clip filenames.

### `legacy/screens.js`

The original compiled code, lifted across so the whole app runs from source
while it is rewritten screen by screen. It is not a dead copy:

- its data is imported from `src/data`, so that directory is the single source
  of truth and editing it changes these screens too
- its clip playback delegates to `src/audio/engine.js`

**Do not reformat or prettify it.** Migrate by lifting one screen out into a
real component, pointing `App.jsx` at it, and deleting what stops being
referenced. The build stays green throughout.

## If you must edit `index.html` directly

Only when there is a specific reason not to go through `source/`.

It is a minified build: 191 lines, one of them 153,000 characters.

- **Never reformat, prettify or regenerate it.** A reformat produces an
  unreviewable diff and throws away everything recorded here.
- **Never replace it with a file generated from a chat.** That silently
  discards the iOS audio fixes, the quiz data and the navigation work.
- Make targeted edits: match an exact string, confirm it appears **exactly
  once**, replace just that string.
- When inserting into an array, bracket-count to find its real end. Matching
  `]}` finds the end of the first element, not the array, and quietly writes
  your change into the wrong place.

Data markers inside the bundle: `Tc=[` letters, `mm=[` quizzes, `n3={` letter
audio by name, `cm={` letter audio by character, `dm={` word audio.

## Audio

372 clips plus two music tracks. Three naming generations coexist:

- `Name (3).m4a` (169) are the current refined recordings.
- `Name (q).m4a` (78) are the quiz recordings, one per quiz question.
- 125 older files remain and a few are still referenced. Do not delete them.

Letters are named for the lesson entry name (`Alef`, `Dal`, `Vav (v)`); words
for the romanisation with macrons (`āb`, `bābā`). `ی` and `و` each appear
**twice** in Level 1 as different letters with different recordings, which is
why letter audio is keyed by name rather than by character. Do not "simplify"
that back.

### The filename trap

86 filenames store their macrons **decomposed** (`a` + U+0304) while macOS
hands back the **composed** form (`ā`, U+0101). A URL built from the composed
form returns 404 on GitHub Pages silently: no error, the clip just never
plays.

**Read filenames from `git ls-tree -r -z --name-only HEAD`, never from the
working directory**, and keep the exact bytes.

### Why the audio code looks complicated

- iOS Safari treats `HTMLMediaElement.volume` as read only, so volume runs
  through a Web Audio gain node, built inside a user gesture.
- Clips are cached one element per file, capped at 8. Reassigning `src` on a
  shared element makes the browser fire a spurious `error` and reject the
  pending `play()`, both of which read as "clip finished" and un-ducked the
  music mid word. Caching all 250 made iPhones crawl.
- The duck is relative to the listener's chosen volume. Do not hard code it.

## Verifying a change

No test suite, so check by hand before opening a pull request.

Serve the app (`cd source && npm run dev`, or `python3 -m http.server 8899`
at the repo root for the shipped file) and confirm:

1. The page renders with **no red console errors**.
2. Whatever you touched still works, including a quiz if you touched quizzes.
3. **Every referenced clip resolves.** This is what catches the filename trap.
   Run from the repo root against whichever server you started:

```bash
python3 - <<'EOF'
import io, re, urllib.parse, urllib.request
BASE = 'http://127.0.0.1:8899/'      # or http://localhost:5180/ for the dev server
s = io.open('index.html', encoding='utf-8').read()
refs = set(re.findall(r'v\("([^"]+)"\)', s)) | set(re.findall(r'audio:"([^"]+)"', s))
bad = []
for r in sorted(refs):
    u = BASE + urllib.parse.quote(r, safe="!~*'()-._")
    try: code = urllib.request.urlopen(u, timeout=10).getcode()
    except Exception as e: code = getattr(e, 'code', 0)
    if code != 200: bad.append((r, code))
print('referenced %d, broken %d' % (len(refs), len(bad)))
for r, c in bad: print('  ', r, c)
EOF
```

One known break: `Zeeba.m4a` (زیبا) has never been recorded. Anything else is
a regression you introduced.

## Checklist before pushing

- [ ] Changed one tree, not both
- [ ] Did not reformat `index.html` or `legacy/screens.js`
- [ ] Each replaced string matched exactly once
- [ ] Clip check reports no new breaks
- [ ] Opened the app and clicked through what changed
- [ ] Commit message says what changed and why

## Things people have broken before

- Uploading a freshly generated `index.html`, wiping months of fixes.
- Inserting into the wrong array by matching `]}` instead of bracket counting.
- Building clip URLs from composed Unicode, so macron clips 404 silently.
- Deleting audio files the app still references.
