import { PrismaAdapter } from "@auth/prisma-adapter";
import { QwikAuth$ } from "@auth/qwik";
import Discord from "@auth/qwik/providers/discord";
import Google from "@auth/qwik/providers/google";
import { Database } from "~/server/data/db";


export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(() => ({
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Discord({
        clientId: process.env.DISCORD_CLIENT_ID!,
        clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      }),
    ],

    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(Database.getinstance()),
    debug: true,
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      strategy: "database",

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
      // The maximum age of the NextAuth.js issued JWT in seconds.
      // Defaults to `session.maxAge`.
      maxAge: 60 * 60 * 24 * 30,
      // You can define your own encode/decode functions for signing and encryption
      encode(params) {
        return Promise.resolve("encoded-string");
      },
      decode(params) {
        return Promise.resolve(null); // or return a valid JWT object
      },
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
       

        return true;
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
        async session({ session }) {
          return session;
        },
    },
    events: {
      async signIn(message) {
        /* on successful sign in */
        //console.log(message);
      },
      async signOut(message) {
        /* on signout */
        console.log(message);
      },
      async createUser(message) {
        /* user created */
        console.log(message);
      },
      async updateUser(message) {
        /* user updated - e.g. their email was verified */
        console.log(message);
      },
      async linkAccount(message) {
        /* account (e.g. Twitter) linked to a user */
        console.log(message);
      },
      async session(message) {
        /* session is active */
        //console.log(message);
      },
    },
    logger: {
      error(error: Error) {
        console.error(error);
      },
      warn(code) {
        console.warn(code);
      },
      debug(code, metadata) {
        console.debug(code, metadata);
      },
    },
  }),
);
