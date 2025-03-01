import { Router } from  'express';
import { createReview, deleteReview, getAllReview, getReview, updateReview } from '../controllers/reviewController.js';

export const reviewRouter = Router();

reviewRouter.route('/').get(getAllReview)
reviewRouter.route('/:startupId').get(getReview).post(createReview)
reviewRouter.route('/:id').patch(updateReview).delete(deleteReview)