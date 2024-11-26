import { inspect } from 'node:util'
import { useLogger } from '@nuxt/kit'
import type { NuxtConfig } from '@nuxt/schema'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const logger = useLogger()

const buildConfig = () => {
  logger.info('Loading config…')
  const {
    NUXT_DEBUG: debug = 'false',
    NUXT_FIREBASE_CLOUD_REGION: region = 'europe-west9',
    NUXT_FIREBASE_CLOUD_MAX_INSTANCES: maxInstances = '3',
  } = process.env
  const config = {
    debug: debug === 'true',
    region,
    maxInstances: Number(maxInstances),
  }
  if (config.debug) {
    logger.info('Loaded config:', inspect(config, { sorted: true }))
  }
  return config
}

const config = buildConfig()
const { debug, maxInstances, region } = config

const nuxtConfig: NuxtConfig = {
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2024-04-03',
  debug,
  devtools: { enabled: true },
  logLevel: 'info',
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        if (config.plugins) {
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
      dir: 'dist/nuxt',
    },
  },
  srcDir: 'src',
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
}

export default defineNuxtConfig(nuxtConfig)
