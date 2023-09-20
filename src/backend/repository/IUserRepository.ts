import { User } from '@prisma/client';

export interface IUserParams {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  emailVerified?: Date;
}

export interface IUserRepository {
  getById: (reference: string) => Promise<User | null>;
  delete: (reference: string) => Promise<User | null>;
  create: (reference: IUserParams) => Promise<User | null>;
  verifyIfUserExist: (email: string) => Promise<User | null>;
  updatePassword: (reference: IUserParams) => Promise<User | null>;
  update: (reference: IUserParams) => Promise<User | null>;
}
