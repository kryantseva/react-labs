import { Offer } from '../models/offer.js';
import { User } from '../models/user.js'; // 
import ApiError from '../../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js'; 

export async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        console.error("Не удалось получить список предложений:", error);
        next(ApiError.internal('Не удалось получить список предложений.'));
    }
}

export async function createOffer(req, res, next) {
    try {
        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId
        } = req.body;

        if (!req.files || !req.files.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки.'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

        let processedPhotos = [];
        if (req.files && req.files.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }

        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch (e) {
                if (typeof features === 'string') {
                    parsedFeatures = features.split(',').map(f => f.trim());
                } else {
                    console.warn("Features не являются строкой или массивом:", features);
                    parsedFeatures = [];
                }
            }
        }

        const offer = await Offer.create({
            title,
            description,
            publishDate: publishDate || new Date(),
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium,
            isFavorite,
            rating,
            type,
            rooms,
            guests,
            price,
            features: parsedFeatures,
            commentsCount: commentsCount || 0,
            latitude,
            longitude,
            authorId: userId
        });

        return res.status(201).json(offer);
    } catch (error) {
        console.error("Ошибка при добавлении предложения:", error);
        if (error.name === 'SequelizeValidationError') {
            return next(ApiError.badRequest(`Ошибка валидации: ${error.message}`));
        }
        next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }
}

export async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id, {
            include: { model: User, as: 'author' } 
        });

        if (!offer) {
            return next(ApiError.notFound('Предложение не найдено.'));
        }

        const adaptedOffer = adaptFullOfferToClient(offer.toJSON()); 

        return res.status(200).json(adaptedOffer);
    } catch (error) {
        console.error("Ошибка при получении полного предложения:", error);
        next(ApiError.internal('Не удалось получить полное предложение: ' + error.message));
    }
}