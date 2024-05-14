import { pool } from '../config';
import { Post } from '../models/Post';

export const postService = {

    async getAllPosts(): Promise<Post[]> {
        const result = await pool.query('SELECT * FROM posts');
        return result.rows;
    },

    async getUserAndPublicPosts(userId: number): Promise<Post[]> {
        const result = await pool.query(
          'SELECT * FROM posts WHERE visibility = $1 OR user_id = $2',
          ['public', userId]
        );
        return result.rows;
    },

    async createPost(title: string, content: string, visibility: string, user_id: number): Promise<Post> {
        const result = await pool.query(
            'INSERT INTO posts (title, content, visibility, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, content, visibility, user_id]
        );
        return result.rows[0];
    },
    
    async deletePost(postId: number): Promise<void> {
        await pool.query('DELETE FROM posts WHERE post_id = $1', [postId]);
    },

    async editPost(postId: number, updatedFields: { title?: string; content?: string; visibility?: string }): Promise<void> {
        const setClauses: string[] = [];
        const values = [];
        let query = 'UPDATE posts SET ';
    
        Object.keys(updatedFields).forEach((field, index) => {
          setClauses.push(`${field} = $${index + 1}`);
          values.push((updatedFields as any)[field]);
        });
    
        query += setClauses.join(', ');
        query += ' WHERE post_id = $' + (values.length + 1);
        values.push(postId);
    
        await pool.query(query, values);
      },

};