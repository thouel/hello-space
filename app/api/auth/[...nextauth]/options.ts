// import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
// import Auth0 from "next-auth/providers/auth0"
// import Authentik from "next-auth/providers/authentik"
// import AzureAD from "next-auth/providers/azure-ad"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
// import Box from "next-auth/providers/box"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Bungie from "next-auth/providers/bungie"
// import Cognito from "next-auth/providers/cognito"
// import Coinbase from "next-auth/providers/coinbase"
import Discord, { DiscordProfile } from 'next-auth/providers/discord'
// import Dropbox from "next-auth/providers/dropbox"
// import DuendeIDS6 from "next-auth/providers/duende-identity-server6"
// import Eveonline from "next-auth/providers/eveonline"
// import Facebook from "next-auth/providers/facebook"
// import Faceit from "next-auth/providers/faceit"
// import FortyTwoSchool from "next-auth/providers/42-school"
// import Foursquare from "next-auth/providers/foursquare"
// import Freshbooks from "next-auth/providers/freshbooks"
// import Fusionauth from "next-auth/providers/fusionauth"
// import Gitlab from "next-auth/providers/gitlab"
import Github, { GithubProfile } from 'next-auth/providers/github'
// import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Instagram from "next-auth/providers/instagram"
// import Kakao from "next-auth/providers/kakao"
// import Keycloak from "next-auth/providers/keycloak"
// import Line from "next-auth/providers/line"
// import LinkedIn from "next-auth/providers/linkedin"
// import Mailchimp from "next-auth/providers/mailchimp"
// import Mailru from "next-auth/providers/mailru"
// import Medium from "next-auth/providers/medium"
// import Naver from "next-auth/providers/naver"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Osso from "next-auth/providers/osso"
// import Osu from "next-auth/providers/osu"
// import Passage from "next-auth/providers/passage"
// import Patreon from "next-auth/providers/patreon"
// import Pinterest from "next-auth/providers/pinterest"
// import Pipedrive from "next-auth/providers/pipedrive"
import Reddit from 'next-auth/providers/reddit'
// import Salesforce from "next-auth/providers/salesforce"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Strava from "next-auth/providers/strava"
// import Todoist from "next-auth/providers/todoist"
// import Trakt from "next-auth/providers/trakt"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"
// import UnitedEffects from "next-auth/providers/united-effects"
// import Vk from "next-auth/providers/vk"
// import Wikimedia from "next-auth/providers/wikimedia"
// import Wordpress from "next-auth/providers/wordpress"
// import WorkOS from "next-auth/providers/workos"
// import Yandex from "next-auth/providers/yandex"
// import Zitadel from "next-auth/providers/zitadel"
// import Zoho from "next-auth/providers/zoho"
// import Zoom from "next-auth/providers/zoom"

import type { NextAuthOptions } from 'next-auth'
import { randomBytes, randomUUID } from 'crypto'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/db/db'
import { log } from '@logtail/next'

const options = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID ?? '',
      clientSecret: process.env.AUTH_DISCORD_SECRET ?? '',
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
    Reddit({
      clientId: process.env.AUTH_REDDIT_ID ?? '',
      clientSecret: process.env.AUTH_REDDIT_SECRET ?? '',
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 24 hours

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 60 * 60, // 60 minutes

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex')
    },
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds
    maxAge: 60 * 60 * 24,
  },

  callbacks: {
    async jwt({ token, account, profile, session, trigger }) {
      // log.debug('jwt', { token, account, profile, session, trigger })

      if (trigger === 'update') {
        log.debug('in jwt update', { session, token })
        if (session.type === 'likes') {
          token.likes = session.likes
        } else if (session.type === 'avatar') {
          token.picture = session.picture
        } else if (session.type === 'banner') {
          token.banner = session.banner
        }
      }

      if (trigger === 'signIn' || trigger === 'signUp') {
        try {
          const userInDb = await prisma.user.findUniqueOrThrow({
            where: { name: token.name ?? '' },
            include: {
              picturesLiked: true,
            },
          })

          // The user id
          token.id = userInDb.id

          // Search the user's default avatar depending on its provider
          let accountAvatar
          if (account?.provider === 'github') {
            const gh = profile as GithubProfile
            accountAvatar = gh?.avatar_url
          } else if (account?.provider === 'reddit') {
            //TODO: add the reddit avatar
          } else if (account?.provider === 'discord') {
            const d = profile as DiscordProfile
            accountAvatar = d.avatar
          }

          // Get the user's avatar
          token.picture = userInDb.image ?? accountAvatar

          // Get the user's banner
          token.banner = userInDb.bannerPicture

          // Get the user's liked pictures
          token.likes = userInDb.picturesLiked.map((pl) => pl.date)
        } catch (e) {
          log.error('Error during initializing user session', { e })
        }
      }

      // log.debug('ending jwt', { token, account, profile, session, trigger })
      return token
    },
    async session({ session, token, user }) {
      // log.debug('session', { session, token, user })

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          banner: token.banner,
          likes: token.likes,
        },
      }
    },
  },
  pages: { signIn: '/auth/login' },
} satisfies NextAuthOptions

export default options
