import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';
import { authenticateAccountFactory } from '@/backend/useCase/auth/authenticateAccountCase/authenticateAccountFactory';

export const authOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    /*   TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }), */
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          type: 'text',
          label: 'email',
        },
        password: {
          type: 'password',
          label: 'password',
        },
      },
      async authorize(credentials) {
        const userFind = await authenticateAccountFactory().handle({
          email: credentials?.email,
          password: credentials?.password,
        });

        return userFind;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, credentials }: { user: any; account: any; credentials: any }) {
      console.log(credentials);
      const userRepository = new PrismaUserRepository(prismaClient);
      const userFind = await userRepository.verifyIfUserExist(user.email);

      if (userFind) {
        const userAccount = await prismaClient.account.findFirst({
          where: {
            userId: userFind.id,
          },
        });

        if (userAccount?.provider === account.provider) {
          return true;
        } else if (account.provider === 'credentials') {
          await authenticateAccountFactory().handle({
            email: credentials.email,
            password: credentials?.password,
          });
          return true;
        } else {
          throw new Error(`Email already linked to your ${userAccount?.provider} account`);
        }
      }

      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          emailVerified: user?.emailVerified,
        };
      }
      return token;
    },
    async session({ session, token }: { token: any; session: any }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          emailVerified: token.emailVerified,
        },
      };
    },
  },
  pages: {
    signIn: '/signin',
    error: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
