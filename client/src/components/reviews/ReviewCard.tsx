import { FaStar } from "react-icons/fa";
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";

interface Review {
  _id?:string
  startupId: string | undefined;
  rating: number;
  comment: string;
  user: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  const { user, rating, comment,} = review;

  return (
    <div className="border p-4 my-4 rounded-md shadow-sm bg-white hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-lg">{user}</h4>
      </div>

      {/* Rating Section */}
      <div className="flex items-center text-yellow-500 mb-2">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} />
          ))}
      </div>

      {/* Review Comment */}
      <p className="text-gray-700 mb-4">{comment}</p>

      {/* Reaction Buttons */}
      <div className="flex gap-4 text-lg">
        <button className="flex items-center text-green-500 hover:text-green-700 transition">
          <Heart size={20} />
          {/* <span className="ml-2">Love</span> */}
        </button>
        <button className="flex items-center text-blue-500 hover:text-blue-700 transition">
          <ThumbsUp size={20} />
          {/* <span className="ml-2">Like</span> */}
        </button>
        <button className="flex items-center text-red-500 hover:text-red-700 transition">
          <ThumbsDown size={20} />
          {/* <span className="ml-2">Dislike</span> */}
        </button>
      </div>
    </div>
  );
}
