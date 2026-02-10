import { defineConfig } from 'vite'
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

let gitSha = 'dev'
let gitShaFull = ''
try {
  gitSha = execSync('git rev-parse --short HEAD').toString().trim()
  gitShaFull = execSync('git rev-parse HEAD').toString().trim()
} catch {}

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __GIT_SHA__: JSON.stringify(gitSha),
    __GIT_SHA_FULL__: JSON.stringify(gitShaFull),
  },
})
