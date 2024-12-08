import { fileURLToPath } from 'node:url'
import type { GitHubActionOptions } from '@estruyf/github-actions-reporter'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import {
  type PlaywrightTestConfig,
  defineConfig,
  devices,
} from '@playwright/test'
import { config } from 'dotenv'
import { isCI } from 'std-env'

config({ path: '.env' })
config({ path: '.env.test' })
config({ path: '.env.local' })

const { PLAYWRIGHT_BASE_URL, PLAYWRIGHT_ENV } = process.env
if (PLAYWRIGHT_ENV) {
  config({ path: `.env.${PLAYWRIGHT_ENV}` })
}
const startLocalServer = isCI && !PLAYWRIGHT_BASE_URL
const baseURL = PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
const projects = [
  {
    name: 'chromium',
    use: devices['Desktop Chrome'],
  },
]
const reporter: PlaywrightTestConfig['reporter'] = isCI
  ? [
      ['list'],
      [
        '@estruyf/github-actions-reporter',
        <GitHubActionOptions>{
          title: 'Demo sandbox e2e tests report',
          useDetails: true,
          showError: true,
        },
      ],
    ]
  : [['html', { outputFolder: './dist/test/e2e/html-report' }]]
const retries = isCI ? 2 : 0
const workers = isCI ? 1 : undefined

console.log('baseURL')
const webServer = startLocalServer
  ? {
      command: 'pnpm start',
      url: baseURL,
      reuseExistingServer: false,
    }
  : undefined

export default defineConfig<ConfigOptions>({
  forbidOnly: isCI,
  outputDir: './dist/test/e2e/results',
  projects,
  reporter,
  respectGitIgnore: true,
  retries,
  testDir: './test/e2e',
  use: {
    baseURL,
    nuxt: {
      build: false,
      host: baseURL,
      nuxtConfig: {
        nitro: {
          output: {
            dir: fileURLToPath(new URL('dist/nuxt', import.meta.url)),
          },
        },
      },
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      server: startLocalServer,
    },
    trace: 'on-first-retry',
  },
  webServer,
  workers,
})
