import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (!user || !user.password) {
            throw new Error("Invalid login credentials");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid login credentials");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication service temporarily unavailable");
        }
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
            role: 'USER',
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
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        const adminEmails = ['admin@dattasable.com', 'sabledattatray@gmail.com'];
        const role = (user.email && adminEmails.includes(user.email)) ? 'ADMIN' : ((user as any).role || 'USER');
        
        // Persist user to DB if they don't exist (important for OAuth users)
        try {
          const dbUser = await prisma.user.upsert({
            where: { email: user.email as string },
            update: { name: user.name, image: (user as any).image },
            create: {
              email: user.email as string,
              name: user.name,
              role: role,
              image: (user as any).image,
            }
          });
          token.id = dbUser.id;
          token.role = dbUser.role;
        } catch (error) {
          console.error("Error upserting user:", error);
          token.id = user.id;
          token.role = role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-only-change-in-prod',
  debug: process.env.NODE_ENV === 'development',
};
