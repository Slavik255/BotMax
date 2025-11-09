import express, { Request, Response } from 'express';
import { getBotReply } from './botLogic'; // ← без .js, без .ts

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

app.use(express.json());

// Health-check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: '✅ BotMax Logic Server запущен (без БД)' });
});

// API для чата
app.post('/api/chat', (req: Request, res: Response) => {
  const { message } = req.body;

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Поле "message" должно быть непустой строкой' });
  }

  try {
    const reply = getBotReply(message);
    res.json({
      reply: reply.text,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Ошибка:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Бот запущен на http://localhost:${PORT}`);
});