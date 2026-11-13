# Farsi Duolingo

A single page app for learning the Farsi alphabet: letter lessons with forms
and example words, word building quizzes, writing animations, games, and a
recorded pronunciation for every letter and word.

**Live: https://cyruskmerati-oss.github.io/Farsi-Duolingo/**

## What is in here

| | |
| --- | --- |
| `index.html` | What the live site serves. One file, already built. |
| `source/` | The source project the app is being rebuilt into. |
| `*.m4a` | 372 pronunciation clips. |
| `*.mp3` | Two background music tracks, played in a loop. |
| `AGENTS.md` | How to edit this safely. Read it first. |

**GitHub Pages republishes the site a couple of minutes after any change lands
on `main`.**

Note that `index.html` and `source/` are **not linked yet**: the shipped file
is still the original hand-edited build, and nothing has been published from
`source/`. `AGENTS.md` explains which one to change and why it matters.

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

## Known gap

زیبا (zibā) has no recording, so that one word is silent. Every other
referenced clip plays.
