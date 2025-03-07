import { Layout } from "lucide-react"
import { useState } from "react";
import { RootState } from './store/store';
import { addPost } from './store/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from "./components/Post";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPost, setShowNewPost] = useState(false);

  const toggleShowNewPost = () => setShowNewPost(!showNewPost);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim()) {
      dispatch(addPost({
        ...newPost,
      }));
      setNewPost({ title: '', content: '' });
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Layout className="text-blue-900" size={32} />
            <h1 className="text-2xl font-bold">Reddit Clone</h1>
          </div>
        </div>
      </header>
      <main className="flex flex-col justify-center max-w-4xl mx-auto px-4 py-8">
        {!showNewPost &&
          <button
            onClick={toggleShowNewPost}
            className="w-full mb-6 px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Create a post...
          </button>
        }
        {showNewPost &&
          <form
            className="bg-white rounded-lg shadow-md p-6 mb-6"
            onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full mb-4 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                    Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  Post
                </button>
              </div>
          </form>
        }
        {[...posts]
          .sort((a, b) => b.score - a.score)
          .map(post => 
            <Post
              key={post.id}
              post={post}
            />
        )}
        {posts.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No posts yet. Be the first to create one!
            </div>
          )}
      </main>
    </div>
  )
}

export default App;