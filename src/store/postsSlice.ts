import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types';
import { formatISO } from 'date-fns';

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<{ title: string; content: string }>) {
      state.posts.unshift({
        id: crypto.randomUUID(),
        ...action.payload,
        createdAt: formatISO(new Date()),
        comments: [],
        score: 0,
      });
    },
    votePost(state, action: PayloadAction<{ postId: string; change: number }>) {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.score += action.payload.change;
      }
    },
    addComment(state, action: PayloadAction<{ postId: string; content: string }>) {
      const post = state.posts.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.unshift({
          id: crypto.randomUUID(),
          content: action.payload.content,
          createdAt: formatISO(new Date()),
          score: 0,
        });
      }
    },
  },
});

export const { addPost, votePost, addComment } = postsSlice.actions;
export default postsSlice.reducer;