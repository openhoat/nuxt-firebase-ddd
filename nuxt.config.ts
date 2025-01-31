import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inspect } from 'node:util'
import type { NuxtConfig } from '@nuxt/schema'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import type { AppConfig } from '~/types'

const domains = ['hello', 'counter']

const rootDir = fileURLToPath(new URL('.', import.meta.url))

const domainRootDirs = domains.map((domain) => `src/domains/${domain}`)
const watch = domains.map((domain) => `domains/${domain}/nuxt.config.ts`)

const buildConfig = () => {
  console.info('Loading config…')
  const {
    NUXT_DEBUG: debug = 'false',
    NUXT_FIREBASE_CLOUD_REGION: region = 'europe-west9',
    NUXT_FIREBASE_CLOUD_MAX_INSTANCES: maxInstances = '3',
    NUXT_FIREBASE_PROJECT_ID: firebaseProjectId,
    NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL:
      firebaseServiceAccountClientEmail,
    NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY: firebaseServiceAccountPrivateKey,
  } = process.env
  const config: AppConfig = {
    debug: debug === 'true',
    maxInstances: Number(maxInstances),
    region,
    runtimeConfig: {
      firebaseServiceAccountClientEmail,
      firebaseServiceAccountPrivateKey,
      public: {
        firebaseProjectId,
      },
    },
  }
  if (config.debug) {
    console.info('Loaded config:', inspect(config, { sorted: true }))
  }
  return config
}

const config = buildConfig()
const { debug, maxInstances, region, runtimeConfig } = config

const nuxtConfig: NuxtConfig = {
  appConfig: {
    features: {},
  },
  build: {
    transpile: ['vuetify'],
  },
  buildDir: join(rootDir, 'nuxt-build'),
  compatibilityDate: '2024-04-03',
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css',
  ],
  debug,
  devtools: { enabled: true },
  extends: domainRootDirs,
  imports: { autoImport: false },
  logLevel: 'info',
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (config.plugins) {
          // @ts-ignore
          config.plugins.push(vuetify({ autoImport: true }))
        }
      })
    },
    '@nuxtjs/robots',
  ],
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances,
        region,
      },
    },
    output: {
      dir: join(rootDir, 'dist/nuxt'),
    },
  },
  runtimeConfig,
  sourcemap: {
    server: true,
    client: true,
  },
  srcDir: 'src',
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern',
        },
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  watch,
}

export default defineNuxtConfig(nuxtConfig)
