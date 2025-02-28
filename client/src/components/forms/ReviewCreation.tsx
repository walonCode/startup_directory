import { useState } from "react";
import { FaUser, FaStar, FaCommentDots } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/storeHooks";
import { postReview } from "../../store/features/reviewSlice";
import { useParams } from "react-router-dom";

export default function ReviewCreation() {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const { startupId }  = useParams()

  const dispatch = useAppDispatch();

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !rating || !comment ) {
      alert("All fields are required!");
      return;
    }

    const data = {
      startupId,
      rating,
      comment,
      user,
    };

    dispatch(postReview(data));

    // Reset form
    setUser("");
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 shadow-lg rounded-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* User Name */}
        <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition">
          <FaUser className="text-green-600 text-xl mr-3" />
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full bg-transparent outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
        </div>

        {/* Star Rating */}
        <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition">
          <FaStar className="text-green-600 text-xl mr-3" />
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl transition ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="flex items-start border border-gray-300 p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition">
          <FaCommentDots className="text-green-600 text-xl mr-3 mt-1" />
          <textarea
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-transparent outline-none resize-none focus:ring-2 focus:ring-green-500 transition"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md hover:shadow-lg focus:ring-4 focus:ring-green-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
