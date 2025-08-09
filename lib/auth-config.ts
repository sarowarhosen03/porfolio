import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  trustHost: true,
  trustHostedDomain: true,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      return user.email === "sarowarhosen03@gmail.com";
    },
  },
} satisfies NextAuthConfig;

NextAuth({
  ...authConfig,

  debug: process.env.NODE_ENV === "development",
});
