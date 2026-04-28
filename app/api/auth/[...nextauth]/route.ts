import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { logAudit } from "@/lib/security";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@dattasable.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      }
    }),
    ...(process.env.GOOGLE_ID && process.env.GOOGLE_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      })
    ] : []),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    ] : []),
    ...(process.env.LINKEDIN_ID && process.env.LINKEDIN_SECRET ? [
      LinkedInProvider({
        clientId: process.env.LINKEDIN_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        issuer: 'https://www.linkedin.com',
        jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          }
        },
      })
    ] : []),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      await logAudit({ userId: user.id, action: 'LOGIN', status: 'SUCCESS', details: `Provider: ${account?.provider}` });
    },
    async signOut({ token }) {
      await logAudit({ userId: token.sub, action: 'LOGOUT', status: 'SUCCESS' });
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
