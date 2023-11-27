import { prisma } from "@/global/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import crypto from 'crypto';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


function hash(str: string) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        if (user && user.password === credentials.password) {
          return { id: `${user.id}`, name: user.username };
        }
        return null;
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  }
});

export { handler as GET, handler as POST };

