import { Router } from "express";
import { getAllOffers, createOffer, getFullOffer, getFavoriteOffers, toggleFavorite } from "../controllers/offerController.js";
import upload from '../middleware/upload.js';
import ApiError from '../../error/ApiError.js';
import multer from 'multer';
import { authenticateToken } from '../middleware/authMiddleware.js'; 

const offerRouter = new Router();

offerRouter.post(
    '/',
    authenticateToken, 
    (req, res, next) => {
        upload.fields([
            { name: 'previewImage', maxCount: 1 },
            { name: 'photos', maxCount: 10 }
        ])(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                console.error("MulterError при загрузке предложения:", err.message);
                return next(ApiError.badRequest(`Ошибка загрузки файла: ${err.message}`));
            } else if (err) {
                console.error("Неизвестная ошибка загрузки при создании предложения:", err);
                return next(ApiError.internal('Неизвестная ошибка при загрузке файлов.'));
            }
            next();
        });
    },
    createOffer
);

offerRouter.get('/favorite', getFavoriteOffers);
offerRouter.post('/favorite/:offerId/:status', authenticateToken, toggleFavorite); 
offerRouter.get('/:id', getFullOffer);
offerRouter.get('/', getAllOffers);

export default offerRouter;