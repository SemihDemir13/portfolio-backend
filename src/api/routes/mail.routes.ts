// src/api/routes/mail.routes.ts
import { Router } from 'express';
import { MailController } from '../controllers/mail.controller';
import { ResendMailService } from '../../infrastructure/services/ResendMailService'; 

const router = Router();

const mailService = new ResendMailService(); 
const mailController = new MailController(mailService);

router.post('/send', mailController.send);
export default router;