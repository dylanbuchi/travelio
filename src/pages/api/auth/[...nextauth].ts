import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { AUTH_CONFIG } from "@/app/config/auth.config";
import { prismaClient } from "@/app/database/prisma-db";

import bcrypt from "bcrypt";

const { googleProvider, githubProvider, nextAuth } = AUTH_CONFIG;

const nextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: googleProvider.clientId,
      clientSecret: googleProvider.clientSecret,
    }),
    GithubProvider({
      clientId: githubProvider.clientId,
      clientSecret: githubProvider.clientSecret,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || credentials?.password)
          throw new Error("Invalid credentials");

        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user.password) throw new Error("Invalid credentials");

        const passwordIsInvalid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (passwordIsInvalid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: nextAuth.secret,
};

export default NextAuth(nextAuthOptions);
