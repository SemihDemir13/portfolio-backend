// src/infrastructure/services/ResendMailService.ts
import { Resend } from 'resend';
import { IMailService } from '../../core/interfaces/IMailService';
import { SendMailRequestDto } from '../../core/dtos/SendMailRequestDto';

export class ResendMailService implements IMailService {
  private resend: Resend;

 constructor() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment değişkeni bulunamadı veya ayarlanmamış.');
  }
  this.resend = new Resend(apiKey);
}

  async sendEmail(request: SendMailRequestDto): Promise<void> {
    const emailTo = process.env.EMAIL_TO;
    if (!emailTo) {
      throw new Error('Alıcı e-posta adresi (EMAIL_TO) tanımlanmamış.');
    }

    const { data, error } = await this.resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: emailTo,
      subject: `Portfolio'dan Yeni Mesaj: ${request.name}`,
      replyTo: request.email,  
      html: `<p><b>Gönderen:</b> ${request.name} (${request.email})</p><p><b>Mesaj:</b><br>${request.message.replace(/\n/g, '<br>')}</p>`,
    });

    if (error) {
      console.error({ error });
      throw new Error('Resend API hatası: E-posta gönderilemedi.');
    }
  }
}