// Copy the built single file over the deployed index.html at the repo root.
//
// Deliberately a separate step from `build`: the repo root index.html is what
// GitHub Pages serves, so overwriting it is a publish, not a build artifact.
import { copyFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const built = resolve(here, '../dist/index.html')
const shipped = resolve(here, '../../index.html')

const before = statSync(shipped).size
copyFileSync(built, shipped)
const after = statSync(shipped).size
console.log(`index.html replaced: ${(before / 1024) | 0} KB -> ${(after / 1024) | 0} KB`)
console.log('Check the app locally before committing. This file is what ships.')
