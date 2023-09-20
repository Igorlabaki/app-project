import { CreateNewUserCase } from './createNewUserCase';

import { IUserParams } from '@/backend/repository/IUserRepository';

class CreateUserController {
  constructor(private createNewUserCase: CreateNewUserCase) {}

  async handle({ email, password, name }: IUserParams) {
    const developerInputs: IUserParams = {
      email,
      password,
      name,
    };
    const token = await this.createNewUserCase.execute(developerInputs);

    return token;
  }
}

export { CreateUserController };
