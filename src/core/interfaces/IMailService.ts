import { SendMailRequestDto } from '../dtos/SendMailRequestDto';

export interface IMailService {
  sendEmail(request: SendMailRequestDto): Promise<void>;
}