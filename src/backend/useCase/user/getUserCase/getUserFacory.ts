import { GetUserCase } from './getUserCase';
import { GetUserController } from './getUserController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';

export const getUserFactory = () => {
  const prismaUserRepository = new PrismaUserRepository(prismaClient);
  const getUserCase = new GetUserCase(prismaUserRepository);
  const getUserController = new GetUserController(getUserCase);

  return getUserController;
};
