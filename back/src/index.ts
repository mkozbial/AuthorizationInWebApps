// backend/src/index.ts
import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello World from backenddddd!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
