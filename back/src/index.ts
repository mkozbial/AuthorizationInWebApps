// backend/src/index.ts
import express from 'express';
import { photoRouter } from './routes/photos';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/photos', photoRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
