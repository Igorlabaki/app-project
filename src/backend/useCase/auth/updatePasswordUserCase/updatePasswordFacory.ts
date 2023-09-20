import { UpdatePasswordCase } from './updatePasswordCase';
import { UpdatePasswordController } from './updatePasswordController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';

export const updatePasswordFactory = () => {
  const prismaUserRepository = new PrismaUserRepository(prismaClient);
  const updatePasswordCase = new UpdatePasswordCase(prismaUserRepository);
  const registerUserController = new UpdatePasswordController(updatePasswordCase);

  return registerUserController;
};
