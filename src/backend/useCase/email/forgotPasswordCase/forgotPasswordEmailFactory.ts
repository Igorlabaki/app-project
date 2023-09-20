import { ForgotPasswordEmailCase } from './forgotPasswordEmailCase';
import { ForgotPasswordEmailController } from './forgotPasswordEmailController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';

export const forgotPasswordEmailFactory = () => {
  const prismaUserRepository = new PrismaUserRepository(prismaClient);
  const forgotPasswordEmailCase = new ForgotPasswordEmailCase(prismaUserRepository);
  const forgotPasswordEmailController = new ForgotPasswordEmailController(forgotPasswordEmailCase);

  return forgotPasswordEmailController;
};
