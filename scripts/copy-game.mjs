import { spawn } from 'child_process'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = (...args) => join(__dirname, '..', ...args)
const outDir = (...args) => projectRoot('out/', ...args)

const pbcopy = data => {
  const proc = spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}

console.log('[copy-game] Reading files...')
const initFile = readFileSync(outDir('init.js'), 'utf-8')
const updateFile = readFileSync(outDir('update.js'), 'utf-8')

console.log('[copy-game] Building game object...')
const game = `{
  init: (elevators, floors) => {
    ${initFile}
  },
  update: (deltaTime, elevators, floors) => {
    ${updateFile}
  },
}
`

console.log('[copy-game] Writing to clipboard...')
pbcopy(game)
