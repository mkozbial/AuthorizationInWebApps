export interface Post {
    post_id: number;
    title: string;
    content: string;
    visibility: 'private' | 'public';
    user_id: number;
    adult : boolean
}