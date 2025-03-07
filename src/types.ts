export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  votes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  votes: number;
}