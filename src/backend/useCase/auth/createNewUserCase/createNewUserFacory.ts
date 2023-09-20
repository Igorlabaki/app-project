import { CreateNewUserCase } from './createNewUserCase';
import { CreateUserController } from './createNewUserController';

import { prismaClient } from '@/backend/prisma/client';
import { PrismaUserRepository } from '@/backend/repository/inPrisma/prismaUserRepository';

export const createUserFactory = () => {
  const prismaUserRepository = new PrismaUserRepository(prismaClient);
  const registerUsersCase = new CreateNewUserCase(prismaUserRepository);
  const registerUserController = new CreateUserController(registerUsersCase);

  return registerUserController;
};
