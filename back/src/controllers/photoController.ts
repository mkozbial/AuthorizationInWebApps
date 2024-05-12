import { Request, Response } from 'express';
import { Photo } from '../models/photo';



export const getAllPhotos = (req: Request, res: Response) => {

      const photos = [
            { id: 1, title: 'Photo 1', url: 'https://example.com/photo1.jpg' },
            { id: 2, title: 'Photo 2', url: 'https://example.com/photo2.jpg' },
            { id: 3, title: 'Photo 3', url: 'https://example.com/photo3.jpg' },
      ];

      
      // TODO : DB QUERY, ADD PAGINATION

      res.json(photos);
};


export const uploadPhoto = (req: Request, res: Response) => {

      // TODO : SAVING PROCESS

      res.json({"status" :  403});
};

export const deletePhoto = (req: Request, res: Response) => {


      const id = req.body.id;

      // TODO : DELETION PROCESS

      res.json({"status" :  404});
};


export const editPhoto = (req: Request, res: Response) => {


      const id = req.body.id;

      // TODO : EDITION PROCESS

      res.json({"status" :  404});
};
