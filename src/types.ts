export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  score: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
}