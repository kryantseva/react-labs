import jwt from 'jsonwebtoken';
import ApiError from '../../error/ApiError.js'; 
import { User } from '../models/user.js'; 

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(ApiError.unauthorized('Нет токена авторизации.'));
        }

        const token = authHeader.split(' ')[1];
        if (!token) { 
            return next(ApiError.unauthorized('Токен отсутствует после Bearer.'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return next(ApiError.unauthorized('Пользователь, указанный в токене, не найден.'));
        }

        req.user = user;
        next(); 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(ApiError.unauthorized('Токен истек.'));
        }
        if (error.name === 'JsonWebTokenError') {
            return next(ApiError.unauthorized('Недействительный токен.'));
        }
        console.error("Ошибка в authenticateToken:", error);
        next(ApiError.internal('Неизвестная ошибка аутентификации.'));
    }
};

export { authenticateToken };