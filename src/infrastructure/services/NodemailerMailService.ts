// src/infrastructure/services/NodemailerMailService.ts
import nodemailer from 'nodemailer';
import { IMailService } from '../../core/interfaces/IMailService';
import { SendMailRequestDto } from '../../core/dtos/SendMailRequestDto';

export class NodemailerMailService implements IMailService {
  // Transporter'ı constructor'da oluşturmuyoruz.
  // private transporter: nodemailer.Transporter;

  constructor() {
    // Constructor'ı boş bırakıyoruz.
  }

  async sendEmail(request: SendMailRequestDto): Promise<void> {
    // TRANSPORTER'I BURADA, TAM İHTİYAÇ DUYULDUĞU ANDA OLUŞTURUYORUZ
    // Bu, process.env değişkenlerinin kesinlikle dolu olmasını garanti eder.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${request.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: request.email,
      subject: `Portfolio'dan Yeni Mesaj: ${request.name}`,
      html: `<p><b>Gönderen:</b> ${request.name} (${request.email})</p><p><b>Mesaj:</b><br>${request.message.replace(/\n/g, '<br>')}</p>`,
    };

    await transporter.sendMail(mailOptions);
  }
}