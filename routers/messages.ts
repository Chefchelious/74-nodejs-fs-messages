import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

interface IMessage {
  message: string;
  datetime: string;
}

const messagesRouter = express.Router();

// const pathName = './messages';
const pathName = path.resolve(__dirname, '../messages');

const createDir = async () => {
  try {
    await fs.access(pathName);
  } catch {
    await fs.mkdir(pathName, { recursive: true });
  }
};

const getMessages = async (): Promise<IMessage[]> => {
  try {
    const files = await fs.readdir(pathName);

    const messages = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(pathName, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
      })
    );

    return messages;
  } catch (e: unknown) {
    throw e;
  }
};

messagesRouter.get('/', async (_, res) => {
  try {
    const messages = await getMessages();

    res.send(messages.slice(-5));
  } catch (e: unknown) {
    res.status(500).send('Internal server error');
  }
});

messagesRouter.post('/', async (req, res) => {
  try {
    const { message }: { message: string } = req.body;

    if (!message) return res.status(400).send({ message: 'invalid data' });

    const data: { message: string; datetime: string } = {
      message,
      datetime: new Date().toISOString(),
    };

    const timestamp = new Date(data.datetime).getTime();

    await createDir();

    const filePath = path.normalize(`${pathName}/${timestamp}.txt`);
    await fs.writeFile(filePath, JSON.stringify(data));

    res.status(201).send(data);
  } catch (e: unknown) {
    console.error(e);
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default messagesRouter;
