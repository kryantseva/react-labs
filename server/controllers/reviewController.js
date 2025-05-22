import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import ApiError from '../../error/ApiError.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';

export const addReview = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const offerId = req.params.offerId;
        const userId = req.user.id; 

        if (!comment || !rating || !offerId || !userId) {
            return next(ApiError.badRequest('Не хватает данных для комментария (текст, рейтинг, ID предложения или ID пользователя).'));
        }

        const review = await Review.create({
            text: comment,
            rating,
            authorId: userId,
            OfferId: offerId
        });

        res.status(201).json(review);
    } catch (error) {
        console.error("Ошибка при добавлении комментария:", error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
             return next(ApiError.badRequest('Указан несуществующий пользователь или предложение.'));
        }
        next(ApiError.internal('Ошибка при добавлении комментария: ' + error.message));
    }
};

export const getReviewsByOfferId = async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: { OfferId: req.params.offerId },
            include: { model: User, as: 'author' },
            order: [['publishDate', 'DESC']]
        });

        const adaptedReviews = reviews.map(adaptReviewToClient);
        res.json(adaptedReviews);
    } catch (error) {
        console.error("Ошибка при получении комментариев:", error);
        next(ApiError.internal('Ошибка при получении комментариев: ' + error.message));
    }
};