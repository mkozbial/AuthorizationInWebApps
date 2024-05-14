import express from 'express';
import { allUsers, modifyUser} from '../controllers/adminController';
import { verifyAdmin } from '../middleware/verifyAdmin';

export const adminRouter = express.Router();

adminRouter.get('/users', verifyAdmin, allUsers);
adminRouter.post('/users/:id', verifyAdmin, modifyUser);