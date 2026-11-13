# Farsi Duolingo

A single page app for learning the Farsi alphabet: letter lessons with forms
and example words, word building quizzes, writing animations, games, and a
recorded pronunciation for every letter and word.

**Live: https://cyruskmerati-oss.github.io/Farsi-Duolingo/**

## What is in here

| | |
| --- | --- |
| `index.html` | What the live site serves. Generated from `source/`. |
| `source/` | The source project. This is what you edit. |
| `*.m4a` | 372 pronunciation clips. |
| `*.mp3` | Two background music tracks, played in a loop. |
| `AGENTS.md` | How to edit this safely. Read it first. |

**GitHub Pages republishes the site a couple of minutes after any change lands
on `main`.**

`index.html` is **generated** from `source/` by `npm run deploy`. Do not edit
it by hand; the next deploy overwrites it. `AGENTS.md` has the details.

## Making a change

Most changes are content, and content lives in `source/src/data/` as readable,
commented files: the letters and their example words, the quizzes, which
recording each word uses. Ask a coding agent (Codex or Claude Code) to make the
change and let it follow `AGENTS.md`, which records the conventions and the
traps.

Good requests are specific: "in the ق + ل quiz, swap the word پول for کلید",
or "make the background music quieter by default".

After a change is merged, open the live link and check the part you changed.
If a pronunciation stops playing, that is the most common kind of breakage,
and `AGENTS.md` has a script that checks every clip at once.

## Asking Codex for a change

Paste this into Codex, fill in the last line, and send it. Keep the whole
thing: the parts above the last line are what stop it going wrong.

```text
Repo: cyruskmerati-oss/Farsi-Duolingo

Read AGENTS.md at the repo root first and follow it.

Things to know before you start:
- index.html at the repo root is GENERATED. Never edit it by hand.
- The source lives in source/. Content lives in source/src/data/ as
  readable files: letters.js (letters, forms, example words),
  checkpoints.js (the quizzes), audio.js (which recording each one uses).
- source/src/legacy/screens.js is deliberately minified. Do not reformat
  or prettify it. Make targeted edits only.
- If you touch audio filenames, read the comment at the top of
  source/src/data/audio.js first. Some names store their macrons
  decomposed and 404 silently if you "normalise" them.

After making the change:
1. Run: cd source && npm install && npm run deploy
   That rebuilds the app and copies the result over the root index.html.
2. Commit the source change and the regenerated index.html together.
3. If you cannot run npm in your environment, say so plainly in your
   summary and commit only the source change. Do not guess at an
   index.html by hand, and do not leave it half updated.

Open a pull request. Do not push straight to main.

In your summary, tell me which files you changed and what I should click
on the live site to check it worked.

What I want changed:
```

## Known gap

زیبا (zibā) has no recording, so that one word is silent. Every other
referenced clip plays.
