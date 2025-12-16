import express, { Request, Response } from 'express';
import cors from 'cors';
import { getHelloResponse } from './db';

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Route to get "Hello, world" from PostgreSQL
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

// Only start the HTTP server when this file is executed directly,
// so that tests can import the app without creating a long-lived listener.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;

