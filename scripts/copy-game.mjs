import { spawn } from 'child_process'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const regex = /^const game = (\{(.|\n)*\})\n\nexport \{ game }$/m
const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = join(__dirname, '../out.js')

const pbcopy = data => {
  const proc = spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}

console.log('[copy-game] Reading file...')
const file = readFileSync(filePath, 'utf-8')

console.log('[copy-game] Copying game object...')
const matches = file.match(regex)
const game = matches[1]

console.log('[copy-game] writing to clipboard...')
pbcopy(game)
