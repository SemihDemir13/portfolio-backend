import { Request, Response } from 'express';
import { IMailService } from '../../core/interfaces/IMailService';

export class MailController {
  constructor(private mailService: IMailService) {}

  public send = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
      }
      
      await this.mailService.sendEmail({ name, email, message });
      return res.status(200).json({ message: 'Mesajınız başarıyla gönderildi!' });
    } catch (error) {
      console.error("Mail Controller Hatası:", error);
      return res.status(500).json({ message: 'Mesaj gönderilirken bir hata oluştu.' });
    }
  };
}