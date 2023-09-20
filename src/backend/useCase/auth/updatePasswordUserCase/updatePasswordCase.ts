import { IUserParams, IUserRepository } from '@/backend/repository/IUserRepository';
import { compare, hash } from 'bcryptjs';

class UpdatePasswordCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id, password }: IUserParams) {
    const passwordHash = await hash(password as string, 8);

    const userInput: IUserParams = {
      id,
      password: passwordHash,
    };

    const entityExists = await this.userRepository.getById(id as string);

    if (!entityExists) {
      const error = new Error();
      error.message = 'This user do not exists.';
      throw error;
    }

    const passwordMatch = await compare(password as string, entityExists.password as string);

    if (passwordMatch) {
      const error = new Error();
      error.message = 'Oops! Your new password must be different from your previous password.';
      throw error;
    }

    const updateUser = await this.userRepository.updatePassword({
      id: userInput.id,
      password: userInput.password,
    });
    return updateUser;
  }
}

export { UpdatePasswordCase };
