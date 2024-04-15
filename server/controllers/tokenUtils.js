const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    // Ваш секретный ключ для подписи токена
    const secretKey = 'Bearer';

    // Генерация токена с использованием payload и секретного ключа
    const token = jwt.sign(payload, secretKey, { expiresIn: '12h' }); // Токен действителен в течение 1 часа

    return token;
};

module.exports = { createToken };
