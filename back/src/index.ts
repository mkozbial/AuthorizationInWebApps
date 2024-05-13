// backend/src/index.ts
import express from 'express';
import { authRouter } from '../src/routes/authRoutes';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello World from backend!');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});