import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { selectStartupById } from "../../store/features/startupSlice";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBuilding, FaEnvelope, FaGlobe, FaMapMarkerAlt,
  FaPhone, FaRegClock, FaServicestack, FaStar, FaPlusCircle
} from "react-icons/fa";
import { postReview, fetchReview, selectReviewsByStartupId } from "../../store/features/reviewSlice";
import ReviewCard from "../reviews/ReviewCard";

export default function StartupDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // Fetch startup details
  const startup = useAppSelector((state) => selectStartupById(state, id));

  // Fetch reviews
  const reviews = useAppSelector((state) => selectReviewsByStartupId(state, id)) || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    dispatch(fetchReview());
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!id || !name || !comment || !rating) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const data = {
        startupId: id,
        user: name,
        comment,
        rating: Number(rating),
      };
      await dispatch(postReview(data)).unwrap();
      
      // Reset form fields
      setName("");
      setComment("");
      setRating("");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setIsModalOpen(false);
    }
  };

  if (!startup) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-red-600">Startup doesn't exist</h2>
      </section>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <FaBuilding className="text-green-600 text-4xl" />
        <h1 className="text-3xl font-bold text-gray-800">{startup.name}</h1>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-6">{startup.description}</p>

      {/* Services */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <FaServicestack className="text-green-600 mr-2" /> Services Offered
        </h3>
        <p className="text-gray-700 mt-2">{startup.services}</p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <FaEnvelope className="text-green-600 mr-2" />
          <a href={`mailto:${startup.email}`} className="text-gray-700 hover:text-green-600">{startup.email}</a>
        </div>
        <div className="flex items-center">
          <FaPhone className="text-green-600 mr-2" />
          <p className="text-gray-700">{startup.contact}</p>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-green-600 mr-2" />
          <p className="text-gray-700">{startup.address}</p>
        </div>
        <div className="flex items-center">
          <FaRegClock className="text-green-600 mr-2" />
          <p className="text-gray-700">{startup.operatingHours}</p>
        </div>
        <div className="flex items-center">
          <FaGlobe className="text-green-600 mr-2" />
          <a href={`https://www.${startup.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{startup.website}</a>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <FaStar className="text-yellow-500 mr-2" /> Reviews
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 transition"
          >
            <FaPlusCircle className="mr-2" /> Add Review
          </button>
        </div>
        {Array.isArray(reviews) && reviews.filter(review => review.startupId === id).map(mapReview => (
          <div className="flex flex-col gap-2 space-y-2">
            <ReviewCard key={mapReview._id} review={mapReview}/>
          </div>
        ))}
      </div>

      {/* Review Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
            <form className="space-y-4" onSubmit={onSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Choose a value</option>
                  <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                  <option value="4">⭐⭐⭐⭐ - Very Good</option>
                  <option value="3">⭐⭐⭐ - Good</option>
                  <option value="2">⭐⭐ - Fair</option>
                  <option value="1">⭐ - Poor</option>
                </select>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Review</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  rows={4}
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
