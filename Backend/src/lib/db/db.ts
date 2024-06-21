import { PrismaClient } from '@prisma/client';

// declare global {
//     var prisma: PrismaClient | undefined;
// }

export const db: PrismaClient | undefined = new PrismaClient();