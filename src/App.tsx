import { Layout } from "lucide-react"
import { useState } from "react";

function App() {
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPost, setShowNewPost] = useState(false);

  const toggleShowNewPost = () => setShowNewPost(!showNewPost);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Submit");
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          className="px-4 py-2 mb-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          onClick={toggleShowNewPost}>
            {showNewPost ? "Close" : "Create Post"}
        </button>
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
                  onClick={() => alert("Cancel")}
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
      </main>
    </div>
  )
}

export default App;