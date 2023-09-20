import { IUserParams } from '../../../repository/IUserRepository';
import { AuthenticateAccountCase } from './authenticateAccountCase';

class AuthenticateAccountController {
  constructor(private authenticateAccountCase: AuthenticateAccountCase) {}

  async handle({ email, password }: IUserParams) {
    const authenticateAccountBody: IUserParams = {
      email,
      password,
    };

    const token = await this.authenticateAccountCase.execute(authenticateAccountBody);

    return token;
  }
}

export { AuthenticateAccountController };
