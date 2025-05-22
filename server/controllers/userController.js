import bcrypt from 'bcrypt';
import ApiError from '../../error/ApiError.js';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken'; 

export const registration = async (req, res, next) => {
    try {
        const { email, password, userType, username } = req.body;

        console.log("Данные из тела запроса (req.body):", req.body);
        console.log("Информация о загруженном файле (req.file):", req.file);

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }

        if (!req.file) {
            console.error("Multer: Файл аватара не был загружен. req.file = undefined.");
            return next(ApiError.badRequest('Изображение аватара обязательно.'));
        }

        const avatarImage = `/static/${req.file.filename}`;

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            userType,
            username,
            avatar: avatarImage,
            password: hashPassword
        });

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, userType: user.userType, avatar: user.avatar },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatar,
                isPro: user.userType === 'pro'
            },
            token 
        });
    } catch (error) {
        console.error("Ошибка при регистрации пользователя:", error);
        next(ApiError.internal('Ошибка регистрации: ' + error.message));
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return next(ApiError.badRequest('Неверный пароль'));
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, username: user.username, userType: user.userType, avatar: user.avatar }, // Добавляем больше данных в payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatar,
                isPro: user.userType === 'pro'
            },
            token
        });
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        next(ApiError.internal('Ошибка авторизации: ' + error.message));
    }
};

export const checkAuth = (req, res, next) => { 
    const user = req.user; 

    if (!user) { 
        return next(ApiError.unauthorized('Пользователь не авторизован'));
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            userType: user.userType,
            avatar: user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } 
    );

    return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        isPro: user.userType === 'pro',
        token
    });
};

export const logout = (req, res) => {
    res.status(200).json({ message: 'Выход успешно выполнен (токен должен быть удален клиентом).' });
};