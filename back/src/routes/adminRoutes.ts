import express from 'express';
import { allUsers} from '../controllers/adminController';
import { verifyAdmin } from '../middleware/verifyAdmin';

export const adminRouter = express.Router();

adminRouter.get('/users', verifyAdmin, allUsers);