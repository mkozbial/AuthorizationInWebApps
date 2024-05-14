// backend/src/index.ts
import express from 'express';
import { authRouter } from '../src/routes/authRoutes';
import { userRouter } from '../src/routes/userRoutes';
import bodyParser from 'body-parser';

const cors = require('cors');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello World from backend!');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});