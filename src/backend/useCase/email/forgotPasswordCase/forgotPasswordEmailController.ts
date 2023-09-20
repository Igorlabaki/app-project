import { ISendEmailParams, ForgotPasswordEmailCase } from './forgotPasswordEmailCase';

class ForgotPasswordEmailController {
  constructor(private forgotPasswordEmailCase: ForgotPasswordEmailCase) {}

  async handle(data: ISendEmailParams) {
    const forgotPassword = await this.forgotPasswordEmailCase.execute(data);

    return forgotPassword;
  }
}

export { ForgotPasswordEmailController };
