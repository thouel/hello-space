import { defineConfig } from 'cypress'
require('dotenv').config({ path: '.env.local' })
const teardown = require('./cypress/lib/teardown')
const init = require('./cypress/lib/init')
const { RedditSocialLogin } = require('cypress-social-logins').plugins
const { GitHubSocialLogin } = require('cypress-social-logins').plugins
const { DiscordSocialLogin } = require('cypress-social-logins').plugins

export default defineConfig({
  projectId: 'oktoao',
  e2e: {
    env: {
      GITHUB_USER: 'thoueldev@gmail.com',
      GITHUB_PW: 'uDot@0bjcf',
      REDDIT_USER: 'thoueldev@gmail.com',
      REDDIT_PW: 'uDot@0bjcf',
      DISCORD_USER: 'thoueldevagain@gmail.com',
      DISCORD_PW: 'uDot@0bjcf',
      SITE_NAME: 'http://localhost:3000',
      COOKIE_NAME: 'next-auth.session-token',
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    specPattern: [
      'cypress/api/*.spec.{js,jsx,ts,tsx}',
      'cypress/e2e/*.spec.{js,jsx,ts,tsx}',
    ],
    setupNodeEvents(on, config) {
      on('task', {
        'db:teardown': () => teardown(),
        'db:init': () => init(),
        RedditSocialLogin: RedditSocialLogin,
        DiscordSocialLogin: DiscordSocialLogin,
        GitHubSocialLogin: GitHubSocialLogin,
      })
    },
  },
})
