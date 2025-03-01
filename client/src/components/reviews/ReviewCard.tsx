import { FaStar } from "react-icons/fa";

interface Reviews {
    startupId:string | undefined
    rating: number;
    comment: string;
    user:string
}

export default function ReviewCard({reviews}:{reviews:Reviews[]}) {
  return (
    <div>    
        {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border p-4 rounded-md shadow-sm">
                    <h4 className="font-semibold">{review.user}</h4>
                    <div className="flex items-center text-yellow-500">
                      {Array(review.rating).fill(0).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
        )}
    </div>
  )
}
