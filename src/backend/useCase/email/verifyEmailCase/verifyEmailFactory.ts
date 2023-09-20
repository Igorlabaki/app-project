import { VerifyEmailCase } from './verifyEmailCase';
import { VerifyEmailController } from './verifyEmailController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';

export const verifyEmailFactory = () => {
  const prismaUserRepository = new PrismaUserRepository(prismaClient);
  const verifyEmailCase = new VerifyEmailCase(prismaUserRepository);
  const verifyEmailController = new VerifyEmailController(verifyEmailCase);

  return verifyEmailController;
};
