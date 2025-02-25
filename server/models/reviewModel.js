import { model, Schema} from "mongoose";

const reviewSchema = new Schema(
    {
      startup: { type: mongoose.Schema.Types.ObjectId, ref: "Startup", required: true },
      user: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = model('reviews',reviewSchema);
export default Review;