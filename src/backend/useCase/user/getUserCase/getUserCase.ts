import { IUserRepository } from '@/backend/repository/IUserRepository';

class GetUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string) {
    const entityExists = await this.userRepository.verifyIfUserExist(email);

    if (!entityExists) {
      const error = new Error();
      error.message = 'This user do not exists.';
      throw error;
    }

    return entityExists;
  }
}

export { GetUserCase };
