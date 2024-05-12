import express from 'express';
import { deletePhoto, editPhoto, getAllPhotos, uploadPhoto } from '../controllers/photoController';

export const photoRouter = express.Router();


photoRouter.get('/', getAllPhotos);
photoRouter.post('/upload', uploadPhoto);
photoRouter.delete('/delete', deletePhoto);
photoRouter.put('/edit', editPhoto);