import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { Post as PostType } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => console.log("upvote")}
            className="text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
          >
            <ArrowBigUp size={24} />
          </button>
          <span className="font-bold text-lg">{post.score}</span>
          <button
            onClick={() => console.log("downvote")}
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
        </div>
      </div>
    </div>
  );
}