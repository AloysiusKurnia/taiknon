import { PrismaClient } from '@prisma/client';

const globalCopy = global as unknown as { prisma: PrismaClient; };
const prisma = globalCopy.prisma ?? new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') globalCopy.prisma = prisma;

export default prisma;