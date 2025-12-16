import express, { Request, Response } from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Route to get "Hello, world" from data file
app.get('/api/hello', (req: Request, res: Response) => {
  try {
    const dataPath = join(__dirname, '..', 'data.txt');
    const message = readFileSync(dataPath, 'utf-8').trim();
    res.json({ message });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

