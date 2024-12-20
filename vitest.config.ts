import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineVitestConfig({
  test: {
    coverage: {
      exclude: ['src/**/*.test.ts'],
      include: ['src/**/*.{vue,ts}'],
      reporter: ['text', 'json-summary', 'json', 'html'],
      reportOnFailure: true,
      reportsDirectory: './dist/test/unit/coverage-report',
    },
    environment: 'jsdom',
    include: ['src/**/*.unit.test.ts'],
    outputFile: './dist/test/unit/report/index.html',
    reporters: ['default', 'html'],
    root: rootDir,
    silent: true,
  },
})
