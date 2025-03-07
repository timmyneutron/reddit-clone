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
      const newPost: Post = {
        id: crypto.randomUUID(),
        ...action.payload,
        createdAt: formatISO(new Date()),
        comments: [],
        score: 0,
      };
      state.posts.push(newPost);
    },
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;