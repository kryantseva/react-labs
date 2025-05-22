import { Router } from 'express';
import upload from '../middleware/upload.js';
import { registration, login, checkAuth, logout } from '../controllers/userController.js'; 
import ApiError from '../../error/ApiError.js';
import multer from 'multer';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/', (req, res, next) => {
    upload.single('avatar')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error("MulterError:", err.message);
            return next(ApiError.badRequest(`Ошибка загрузки файла: ${err.message}`));
        } else if (err) {
            console.error("Неизвестная ошибка загрузки:", err);
            return next(ApiError.internal('Неизвестная ошибка при загрузке файла.'));
        }
        next();
    });
}, registration);

router.post('/login', login); 
router.get('/login', authenticateToken, checkAuth); 
router.delete('/logout', logout); 

export default router;