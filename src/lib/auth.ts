import { User, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@gmail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const user = await db.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        const { password } = credentials!;

        if (!user || !user.password) return null;

        const matchPassword = bcrypt.compareSync(password, user.password);
        if (!matchPassword) return null;

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account && account.provider === "google") {
        const userFound = await db.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (!userFound) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.email,
              image: user.image,
              // You can add other fields here if needed
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      console.log("JWT Callback", { token, user });
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });
      return session;
    },
  },
};

export default authOptions;
