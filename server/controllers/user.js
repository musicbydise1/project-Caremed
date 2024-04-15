const bcrypt = require('bcrypt');
const { createToken } = require('./tokenUtils'); // Предполагается, что у вас есть модуль для создания токенов
const db = require('../database/dbConfig'); // Предполагается, что это правильное подключение к базе данных

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const signUp = async (req, res, next) => {
  const { username, email, password, dateOfBirth, country, city } = req.body;
  try {
    // Проверяем, существует ли пользователь с таким email
    const emailExists = await db.checkExistence('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExists) {
      return next(new CustomError('User with provided email already exists', 403));
    }

    // Проверяем, существует ли пользователь с таким username
    const usernameExists = await db.checkExistence('SELECT * FROM users WHERE username = $1', [username]);
    if (usernameExists) {
      return next(new CustomError('User with provided username already exists', 403));
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставляем нового пользователя в базу данных
    await db.insertUser(`
      INSERT INTO users (username, email, password, date_of_birth, country, city)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [username, email, hashedPassword, dateOfBirth, country, city]);

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    next(new CustomError('Something went wrong', 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Получаем пользователя из базы данных по email
    const user = await db.getUser('SELECT * FROM users WHERE email = $1', [email]);

    if (!user) {
      return next(new CustomError('Invalid credentials', 400));
    }

    // Проверяем совпадение пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new CustomError('Invalid credentials', 400));
    }

    // Генерируем токен аутентификации
    const accessToken = createToken({ id: user.id });

    // Возвращаем успешный ответ с токеном
    res.header('Authorization', accessToken).json({
      success: true,
      accessToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    next(new CustomError('Something went wrong', 500));
  }
};

const logout = async (req, res, next) => {
  try {
    // Здесь можно было бы добавить проверку наличия токена и его "отзыв",
    // но на практике в большинстве систем это не требуется.

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    next(new CustomError('Something went wrong', 500));
  }
};

module.exports = { signUp, login, logout };
