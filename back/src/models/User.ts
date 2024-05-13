export interface User {
    user_id: number;
    username: string;
    password: string;
    user_type: 'admin' | 'user' | 'editor';
}