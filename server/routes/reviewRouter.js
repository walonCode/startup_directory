import { Router } from  'express';
import { createReview, deleteReview, getReview, updateReview } from '../controllers/reviewController.js';

export const reviewRouter = Router();

reviewRouter.route('/:startupId').get(getReview).post(createReview)
reviewRouter.route('/:id').patch(updateReview).delete(deleteReview)