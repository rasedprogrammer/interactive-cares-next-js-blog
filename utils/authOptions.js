import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import { signIn } from "next-auth/react";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid email or password");
        }
        if (!user?.password) {
          throw new Error("Please login via the method you used to register");
        }
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user?.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid email and password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      dbConnect();
      const { email } = user;
      // Check If User Already Exists
      const dbUser = await User.findOne({ email });
      // If Not, Create New user
      if (!dbUser) {
        await User.create({
          email,
          name: user?.name,
          image: user?.image,
        });
      }
      return true;
    },
    jwt: async ({ token }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      userByEmail.resetCode = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
