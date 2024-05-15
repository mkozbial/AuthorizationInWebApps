import express from 'express';
import { allUsers, modifyUser, deleteUser} from '../controllers/adminController';
import { verifyAdmin } from '../middleware/verifyAdmin';

export const adminRouter = express.Router();

adminRouter.get('/users', verifyAdmin, allUsers);
adminRouter.put('/users/:id', verifyAdmin, modifyUser);
adminRouter.delete('/users', verifyAdmin, deleteUser);