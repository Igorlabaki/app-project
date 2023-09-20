import { UpdatePasswordCase } from './updatePasswordCase';

import { IUserParams } from '@/backend/repository/IUserRepository';

class UpdatePasswordController {
  constructor(private updatePasswordCase: UpdatePasswordCase) {}

  async handle({ id, password }: IUserParams) {
    const userInputs: IUserParams = {
      id,
      password,
    };

    const userUpdated = await this.updatePasswordCase.execute(userInputs);

    return userUpdated;
  }
}

export { UpdatePasswordController };
