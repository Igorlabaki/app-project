import { IUserRepository } from '@/backend/repository/IUserRepository';
import nodemailer from 'nodemailer';

export interface ISendEmailParams {
  email: string;
  username: string;
}

class ForgotPasswordEmailCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email }: ISendEmailParams) {
    const userExists = await this.userRepository.verifyIfUserExist(email);

    if (userExists) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'igorlabakig@gmail.com', // Seu endereço de e-mail
          pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
        },
      });

      const mailOptions = {
        from: 'igorlabakig@gmail.com',
        to: email,
        subject: 'Reset Password',
        html: `
                <div style="font-family: Arial, sans-serif; height: 990px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center">
                            <table width="600" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" bgcolor="#f5f5f5" style="padding: 40px 0;">
                                      <img style="width: 100px; height: 100px; margin: 0 auto;" src="https://res.cloudinary.com/dcjkvwbvh/image/upload/v1694623334/ijtmvvcczlo7m8r8u1mw.png" alt="logo nextAuth" />  
                                      <div style="flex:1;">
                                        <h1 style="font-size: 25px; font-weight: bold;">NextAuth</h1>
                                        <p style="color: gray; font-weight: 500; font-size: 14px;">
                                            Authentication for Next.js
                                        </p>                             
                                      </div>      
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
                                    <h1>Password Reset</h1>
                                        <p>Dear ${userExists.name},</p>
                                        <p>Click the button below to reset your password:</p>
                                        <p>
                                            <a href="${process.env.AXIOS_BASE_URL}/forgotPassword/updatePassword/${userExists.id}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
                                        </p>
                                        <p>If you didn't request a password reset, please ignore this email.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" bgcolor="#f5f5f5" style="padding: 20px 0;">
                                        <p>&copy; 2023 Your Company. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                </div>
            `,
      };

      // Envia o e-mail
      await transporter.sendMail(mailOptions);

      return userExists;
    }

    const error = new Error();
    error.message = 'Oops! It seems there is no account associated with this email address.';
    return error;
  }
}

export { ForgotPasswordEmailCase };
