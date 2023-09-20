import { IUserParams, IUserRepository } from '@/backend/repository/IUserRepository';
import { compare } from 'bcryptjs';

class AuthenticateAccountCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: IUserParams) {
    const userAlreadyExists = await this.userRepository.verifyIfUserExist(email as string);

    if (!userAlreadyExists) {
      const error = new Error();
      error.message = 'Sorry, we couldnt find an account associated with this email address.';
      throw error;
    }

    const passwordMatch = await compare(password as string, userAlreadyExists.password as string);

    if (!passwordMatch) {
      const error = new Error();
      error.message = 'Oops! Incorrect password.';
      throw error;
    }

    return userAlreadyExists;
  }
}

export { AuthenticateAccountCase };
