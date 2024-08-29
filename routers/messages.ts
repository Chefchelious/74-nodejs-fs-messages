import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID, UUID } from 'crypto';

const messagesRouter = express.Router();

// const pathName = './messages';
const pathName = path.resolve(__dirname, '../messages');

console.log(pathName, 'pathName');

messagesRouter.get('/', (_, res) => {
  res.send('last 5 messages will be here');
});

messagesRouter.post('/', async (req, res) => {
  try {
    const { message }: { message: string } = req.body;

    if (!message) return res.status(400).send({ message: 'invalid data' });

    const data: { message: string; datetime: string } = {
      message,
      datetime: new Date().toISOString(),
    };
    
    const filePath = path.normalize(`${pathName}/${randomUUID()}.txt`);
    await fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).send(data);
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default messagesRouter;
