import express, { Request, Response } from 'express';
import cors from 'cors';
import { getHelloResponse, getAuthorResponse } from './db';
import 'dotenv/config';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/api/hello', async (req: Request, res: Response) => {
  try {
    const message = await getHelloResponse();
    res.json({ message });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

app.get('/api/authorInfo', async (req: Request, res: Response) => {
  try {
    const message = await getAuthorResponse();
    res.json({ message });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log("errorMessage: ", errorMessage)
    res.status(500).json({ error: errorMessage });
  }
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;

