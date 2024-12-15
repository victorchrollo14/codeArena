import { serverEnv } from "@config/environ";
import type { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user: any }) => {
      if (user) token.user = user;
      return token;
    },
    session: ({ session, token }: { session: Session; token: any }) => {
      session.user.username = token.user.username;
      session.user.email = token.user.email;
      session.user.fullname = token.user.fullname;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: serverEnv.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          const user = await prisma.user.findFirst({
            where: { email: username },
          });
          console.log(username, password);
          console.log(user);

          if (!user)
            throw new Error(
              `${username} not registered! please register first.`,
            );

          if (user.password) {
            const isMatch = await bcrypt.compare(password, user?.password);

            if (!isMatch) throw new Error("Incorrect Password! Try again");
            console.log("password matches");
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              avatar: user.avatar,
            } as any;
          }

          return null;
        } catch (error: any) {
          throw new Error(error?.message || "Internal Server Error");
        }
      },
    }),
  ],
} satisfies NextAuthOptions;
