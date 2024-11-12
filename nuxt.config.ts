import { resolve } from 'node:path'
import { inspect } from 'node:util'
import type { NuxtConfig } from '@nuxt/schema'
import type { AppConfig } from '~/types'

const buildConfig = () => {
  console.info('Loading config…')
  const {
    NUXT_DEBUG: debug = 'false',
    NUXT_FIREBASE_CLOUD_REGION: region = 'europe-west9',
    NUXT_FIREBASE_CLOUD_MAX_INSTANCES: maxInstances = '3',
  } = process.env
  const config: AppConfig = {
    debug: debug === 'true',
    maxInstances: Number(maxInstances),
    region,
  }
  if (config.debug) {
    console.info('Loaded config:', inspect(config, { sorted: true }))
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
  modules: ['@nuxtjs/robots'],
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances,
        region,
      },
    },
    output: {
      dir: resolve(__dirname, 'dist/nuxt'),
    },
  },
  srcDir: 'src',
}

export default defineNuxtConfig(nuxtConfig)
