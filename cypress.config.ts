import { defineConfig } from 'cypress'
require('dotenv').config({ path: '.env.local' })

export default defineConfig({
  projectId: 'oktoao',
  e2e: {
    env: { APP_TOKEN: process.env.APP_TOKEN },
    baseUrl: 'http://localhost:3000',
    specPattern: [
      'cypress/api/*.spec.{js,jsx,ts,tsx}',
      'cypress/e2e/*.spec.{js,jsx,ts,tsx}',
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
