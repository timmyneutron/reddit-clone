import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react';
import { Post as PostType } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';
import { votePost, addComment } from '../store/postsSlice';
import { useState } from 'react';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const toggleShowComments = () => setShowComments(!showComments);

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch(addComment({
        postId: post.id,
        content: newComment,
      }));
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => dispatch(votePost({ postId: post.id, change: 1 }))}
            className="text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
          >
            <ArrowBigUp size={24} />
          </button>
          <span className="font-bold text-lg">{post.score}</span>
          <button
            onClick={() => dispatch(votePost({ postId: post.id, change: -1 }))}
            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <ArrowBigDown size={24} />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-500">{post.content}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>
          <button
            onClick={toggleShowComments}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <MessageSquare size={20} />
            <span>{post.comments.length} comments</span>
          </button>
        </div>
      </div>
      {showComments &&
        <div className="mt-4 pl-12">
          <form onSubmit={handleAddComment} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Comment
            </button>
          </form>
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 mb-2">
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}