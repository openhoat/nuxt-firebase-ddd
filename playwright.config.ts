import { join } from 'node:path'
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

const { PLAYWRIGHT_BASE_URL, PLAYWRIGHT_ENV = 'local' } = process.env

config({ path: '.env' })
config({ path: '.env.test' })
config({ path: `.env.${PLAYWRIGHT_ENV}` })

const rootDir = fileURLToPath(new URL('.', import.meta.url))

const buildPwConfig = (): PlaywrightTestConfig<ConfigOptions> => {
  const devServer = !isCI && !PLAYWRIGHT_BASE_URL
  const localServer = isCI && !PLAYWRIGHT_BASE_URL
  const baseURL = PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000'
  const host = !devServer ? baseURL : undefined
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
            title: localServer ? 'E2e tests report' : 'Live e2e tests report',
            useDetails: true,
            showError: true,
          },
        ],
      ]
    : [['html', { outputFolder: './dist/test/e2e/html-report' }]]
  const retries = isCI ? 2 : 0
  const workers = isCI ? 1 : undefined
  const webServer =
    localServer && !devServer
      ? {
          command: 'pnpm start',
          url: baseURL,
          reuseExistingServer: false,
        }
      : undefined
  return {
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
        build: devServer,
        buildDir: join(rootDir, 'nuxt-build'),
        host,
        nuxtConfig: {
          nitro: {
            output: {
              dir: join(rootDir, 'dist/nuxt'),
            },
          },
        },
        rootDir,
        server: localServer || devServer,
      },
      trace: 'on-first-retry',
    },
    webServer,
    workers,
  }
}

export default defineConfig<ConfigOptions>(buildPwConfig())
