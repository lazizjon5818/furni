import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Customer } from "../customer/models/customer.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    return otp;
  }

  async sendOTP(customer: Customer) {
    const otp = this.generateOTP();

    try {
      await this.mailerService.sendMail({
        to: customer.email, 
        subject: "Your OTP for Furnibayt", 
        template: "./otp", 
        context: {
          full_name: `${customer.first_name} ${customer.last_name}`,
          otp,
        },
      });
      
      await this.saveOTP(customer, otp); 
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new InternalServerErrorException('Error sending OTP email', error.message);
    }
  }

  async saveOTP(customer: Customer, otp: string) {
    try {
      customer.otp = otp; 
      customer.otp_expiry = new Date(Date.now() + 5 * 60 * 1000);
      await customer.save();
    } catch (error) {
      console.error('Error saving OTP:', error); 
      throw new InternalServerErrorException('Error saving OTP', error.message);
    }
  }

  async sendMail(customer: Customer) {
    try {
      const url = `${process.env.API_URL}:${process.env.PORT}/customer/activate/${customer.activation_link}`;
      await this.mailerService.sendMail({
        to: customer.email,
        subject: "Activate your Furnibayt account",
        template: "./confirm",
        context: {
          full_name: `${customer.first_name} ${customer.last_name}`,
          url,
        },
      });
    } catch (error) {
      console.error('Error sending activation email:', error);
      throw new InternalServerErrorException('Error sending activation email', error.message);
    }
  }
}
