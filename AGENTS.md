# Working on this repo

Instructions for coding agents (Codex, Claude Code) and for anyone editing by hand.
Read this before changing `index.html`.

## What this is

A single page Farsi learning app for children: letter lessons, word building
quizzes, writing animations and games, with recorded pronunciation for every
letter and word.

- Live at https://cyruskmerati-oss.github.io/Farsi-Duolingo/
- GitHub Pages serves the `main` branch from the repo root.
- **Every push to `main` goes live within a couple of minutes.** There is no
  staging site and no build step.

## The one rule that matters

`index.html` is a **301 KB minified build** (191 lines, one of them 153,000
characters). There is no source project anywhere: no `src/`, no bundler, no
`package.json`. The built file is the project.

That means:

- **Never reformat, prettify or regenerate `index.html`.** A reformat produces
  an unreviewable diff and throws away everything recorded here.
- **Never replace it with a file generated from a chat.** That silently
  discards the iOS audio fixes, the quiz data and the navigation work.
- **Make targeted edits only:** find the exact string, replace that string,
  leave the rest of the line untouched.
- Before editing, confirm the string you are matching appears **exactly once**.
  Several identifiers are one or two letters long and collide easily.

The minified identifiers below are stable because the file is never rebuilt.
If anyone ever does rebuild it, every name here changes and this document is
void.

## Where things live in `index.html`

| Marker | What it holds |
| --- | --- |
| `Tc=[` | The 40 Level 1 letter entries: letter, name, forms, example words, highlight |
| `n3={` | Letter audio keyed by the lesson entry **name** (preferred) |
| `cm={` | Letter audio keyed by the **character** (fallback only) |
| `dm={` | Word audio keyed by the normalised Persian word |
| `mm=[` | The 20 quiz checkpoints and their 78 questions |
| `v=e=>` | Builds a clip URL (`encodeURIComponent`, same origin) |
| `ms=e=>` | Plays a clip: ducks the music, boosts the clip, restores afterwards |
| `ps=e=>` | Letter lookup. Takes the **letter object**, not the character |
| `hs=e=>` | Word lookup |

There is a readable `<script>` block near the top of `<body>`, before the
bundle. It is deliberately unminified and commented. Audio helpers live there
(`__fdSetVol`, `__fdInit`, `__fdClipFor`, `__fdCheer`, `__fdBase`). Edit that
block normally.

## Audio

372 clips plus two music tracks. Three naming generations coexist:

- `Name (3).m4a` (169 files) are the current refined recordings.
- `Name (q).m4a` (78 files) are the quiz recordings, one per quiz question.
- 125 older files remain and a handful are still referenced. Do not delete them.

Conventions:

- Letters are named for the lesson entry name (`Alef`, `Dal`, `Vav (v)`).
- Words are named for the romanisation, with macrons (`āb`, `bābā`, `āsemān`).
- `ی` and `و` each appear **twice** in Level 1 as different letters with
  different recordings. That is why letter audio is keyed by name, not by
  character. Do not "simplify" this back to a character key.

### The filename trap

86 filenames store their macrons **decomposed** (`a` + U+0304), while macOS
hands them back **composed** (`ā`, U+0101). A URL built from the composed form
returns 404 on GitHub Pages, silently: no error, the clip just never plays.

**Always read filenames from `git ls-tree -r -z --name-only HEAD`, never from
the working directory.** Keep the exact bytes.

### Why the audio code looks complicated

- iOS Safari treats `HTMLMediaElement.volume` as read only, so volume is
  controlled through a Web Audio gain node. The graph must be built inside a
  user gesture.
- Clips are cached one element per file, capped at 8. Reassigning `src` on a
  shared element makes the browser fire a spurious `error` and reject the
  pending `play()`, which used to read as "clip finished" and un-duck the music
  mid word. Holding all 250 clips instead made iPhones crawl.
- The duck level is relative to `window.__fdBase`, the volume the listener
  chose. Do not hard code it back to a fixed number.

## Verifying a change

There is no test suite, so check these by hand before opening a pull request.

Serve the folder and open it:

```bash
cd /path/to/Farsi-Duolingo && python3 -m http.server 8899
```

Then confirm, in the browser at http://127.0.0.1:8899/ :

1. The page renders and the console has **no red errors** (404s for a missing
   clip are expected only if you know which one).
2. Any screen you touched still works, including a quiz if you touched quizzes.
3. **Every referenced clip resolves.** This catches the filename trap:

```bash
python3 - <<'EOF'
import io, re, urllib.parse, urllib.request
s = io.open('index.html', encoding='utf-8').read()
refs = set(re.findall(r'v\("([^"]+)"\)', s)) | set(re.findall(r'audio:"([^"]+)"', s))
bad = []
for r in sorted(refs):
    u = 'http://127.0.0.1:8899/' + urllib.parse.quote(r, safe="!~*'()-._")
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

- [ ] Edited by targeted replacement, not reformatted
- [ ] Each replaced string matched exactly once
- [ ] Clip check above reports no new breaks
- [ ] Opened the app locally and clicked through what changed
- [ ] Commit message says what changed and why

## Things people have broken before

- Uploading a freshly generated `index.html`, wiping months of fixes.
- Inserting into the wrong array by matching `]}` instead of bracket counting.
- Building clip URLs from composed Unicode, so macron clips 404 silently.
- Deleting audio files that the app still references.
