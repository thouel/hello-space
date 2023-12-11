import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      // The Default Session's user object holds
      // name: the name
      // email: the email
      // image: the avatar's url

      // The user's banner image
      banner: string

      // The user's liked pictures
      likes: string[]
    } & DefaultSession['user']
  }
}
