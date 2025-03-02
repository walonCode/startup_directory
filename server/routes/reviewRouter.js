import { Router } from  'express';
import { createReview, deleteReview, getAllReview, getReviewById, updateReview } from '../controllers/reviewController.js';

export const reviewRouter = Router();

reviewRouter.route('/').get(getAllReview)
reviewRouter.route('/:startupId').get(getReviewById).post(createReview)
reviewRouter.route('/:id').patch(updateReview).delete(deleteReview)