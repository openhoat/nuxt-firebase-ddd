import { fileURLToPath } from 'node:url'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import { defineConfig, devices } from '@playwright/test'

import { config } from 'dotenv'

config({ path: '.env' })
config({ path: '.env.test' })
config({ path: '.env.local' })

export default defineConfig<ConfigOptions>({
  outputDir: './dist/test-e2e',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  reporter: [
    process.env.CI
      ? ['dot']
      : ['html', { outputFolder: './dist/test-e2e-html-report' }],
  ],
  respectGitIgnore: true,
  testDir: './test/e2e',
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
