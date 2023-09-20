import { UpdateUserCase } from './updateCase';
import { UpdateUserController } from './updateUserController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';

export const updateUserFactory = () => {
  const prismaUserRepository = new PrismaUserRepository(prismaClient);
  const updateUserCase = new UpdateUserCase(prismaUserRepository);
  const registerUserController = new UpdateUserController(updateUserCase);

  return registerUserController;
};
