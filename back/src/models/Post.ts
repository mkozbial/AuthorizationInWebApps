export interface Post {
    id: number;
    title: string;
    content: string;
    visibility: 'private' | 'public';
}