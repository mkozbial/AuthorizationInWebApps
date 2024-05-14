import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const getAllPosts = (req: Request, res: Response) => {

      const posts = [
            { id: 1, title: 'Post 1', content: 'content of Post 1!!!!', visibility: 'private' },
            { id: 2, title: 'Post 2', content: 'content of Post 2!!!!', visibility: 'public'},
            { id: 3, title: 'Post 3', content: 'content of Post 3!!!!', visibility: 'public' },
      ];

      // TODO : DB QUERY

      res.json(posts);
};


export const uploadPost = (req: Request, res: Response) => {

      // TODO : SAVING PROCESS

      res.json({"status" :  403});
};

export const deletePost = (req: Request, res: Response) => {


      const id = req.body.id;

      // TODO : DELETION PROCESS

      res.json({"status" :  404});
};


export const editPost = (req: Request, res: Response) => {


      const id = req.body.id;

      // TODO : EDITION PROCESS

      res.json({"status" :  404});
};