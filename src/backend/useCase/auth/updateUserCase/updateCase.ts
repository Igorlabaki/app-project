import { IUserParams, IUserRepository } from '@/backend/repository/IUserRepository';

class UpdateUserCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IUserParams) {
    const entityExists = await this.userRepository.getById(data.id as string);

    if (!entityExists) {
      const error = new Error();
      error.message = 'This user do not exists.';
      throw error;
    }

    const updateUser = await this.userRepository.update(data);
    return updateUser;
  }
}

export { UpdateUserCase };
