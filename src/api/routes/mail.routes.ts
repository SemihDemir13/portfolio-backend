import { Router } from 'express';
import { MailController } from '../controllers/mail.controller';
import { NodemailerMailService } from '../../infrastructure/services/NodemailerMailService';

const router = Router();

// Basit Dependency Injection
const mailService = new NodemailerMailService();
const mailController = new MailController(mailService);

router.post('/send', mailController.send);

export default router;