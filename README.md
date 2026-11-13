# Farsi Duolingo

A single page app for learning the Farsi alphabet: letter lessons with forms
and example words, word building quizzes, writing animations, games, and a
recorded pronunciation for every letter and word.

**Live: https://cyruskmerati-oss.github.io/Farsi-Duolingo/**

## What is in here

| | |
| --- | --- |
| `index.html` | The whole app. One file, already built. |
| `*.m4a` | 372 pronunciation clips. |
| `*.mp3` | Two background music tracks, played in a loop. |
| `AGENTS.md` | How to edit this safely. Read it before changing `index.html`. |

The app has no build step. The file in the repo is the file the browser runs,
and **GitHub Pages republishes the site a couple of minutes after any change
lands on `main`.**

## Making a change

The app is written as one large minified file, so it is not meant to be edited
by hand line by line. Ask a coding agent (Codex or Claude Code) to make the
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
