export interface Photo {
      photo_id: number;
      filename: string;
      filepath: string;
      visibility: 'private' | 'public';
      user_id: number;
}
    