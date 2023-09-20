import { UpdateUserCase } from './updateCase';

import { IUserParams } from '@/backend/repository/IUserRepository';

class UpdateUserController {
  constructor(private updateUserCase: UpdateUserCase) {}

  async handle(data: IUserParams) {
    const userUpdated = await this.updateUserCase.execute(data);

    return userUpdated;
  }
}

export { UpdateUserController };
