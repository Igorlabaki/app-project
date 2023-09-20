import { VerifyEmailCase } from './verifyEmailCase';

class VerifyEmailController {
  constructor(private verifyEmailCase: VerifyEmailCase) {}

  async handle(email: string) {
    const user = await this.verifyEmailCase.execute(email);

    return user;
  }
}

export { VerifyEmailController };
