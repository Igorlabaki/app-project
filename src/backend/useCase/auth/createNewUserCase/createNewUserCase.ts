import { verifyEmailFactory } from '../../email/verifyEmailCase/verifyEmailFactory';

import { IUserParams, IUserRepository } from '@/backend/repository/IUserRepository';
import { hash } from 'bcryptjs';

class CreateNewUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password, name }: IUserParams) {
    const passwordHash = await hash(password as string, 8);

    const userInput: IUserParams = {
      email,
      name,
      password: passwordHash,
    };

    const entityExists = await this.userRepository.verifyIfUserExist(email as string);

    if (!entityExists) {
      const newUser = await this.userRepository.create(userInput);
      if (email) {
        await verifyEmailFactory().handle(email);
      }
      return newUser;
    }

    if (entityExists?.password) {
      const error = new Error();
      error.message = 'Sorry, this email address is already registered.';
      return error;
    }

    const updateUser = await this.userRepository.updatePassword({
      id: entityExists.id,
      password: userInput.password,
    });

    return updateUser;
  }
}

export { CreateNewUserCase };
