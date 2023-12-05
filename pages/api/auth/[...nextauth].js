import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import Prisma from "../../../lib/Prisma";
import bcrypt from "bcryptjs";
export const authOptions = {
  adapter: PrismaAdapter(Prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials, req) {
        const user = await Prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isCorrectPass = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPass) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
