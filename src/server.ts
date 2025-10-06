import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mailRoutes from './api/routes/mail.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use('/api/mail', mailRoutes);

app.listen(port, () => {
  console.log(`✅ Node.js Backend sunucusu http://localhost:${port} adresinde çalışıyor.`);
});

app.get('/', (req, res) => {
  res.status(200).send('Backend is alive!');
});