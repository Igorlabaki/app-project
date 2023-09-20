import { GetUserCase } from './getUserCase';

class GetUserController {
  constructor(private getUserCase: GetUserCase) {}

  async handle(email: string) {
    const user = await this.getUserCase.execute(email);

    return user;
  }
}

export { GetUserController };
