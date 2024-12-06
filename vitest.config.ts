import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['text', 'json-summary', 'json', 'html'],
      reportOnFailure: true,
      reportsDirectory: './dist/test/unit/coverage-report',
    },
    dir: 'test/unit',
    outputFile: './dist/test/unit/report/index.html',
    reporters: ['default', 'html'],
    root: '.',
    silent: true,
  },
})
