const express = require('express');
const { Pool } = require('pg');
const userRoutes = require('./controllers/user');
const tutorialRoutes = require('./routes/tutorial');
const errorMiddleware = require('./middlewares/error');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboard'); // Маршруты для панели управления
const usersRoutes = require('./routes/users'); // Маршруты для пользователей


const app = express();

const connOptions = {
    user: 'postgres',
    host: 'localhost',
    database: 'caremed',
    password: 'root',
    port: 5432,
};

const pool = new Pool(connOptions);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.status(200).send('API working');
});

// Используйте правильный путь для маршрута регистрации пользователей
app.post('/users/signup', userRoutes.signUp);
app.post('/users/login', userRoutes.login);
app.post('/users/logout', userRoutes.logout);
app.use('/admin/dashboard', dashboardRoutes);
app.use('/admin/users', usersRoutes);

// Обработка несуществующих маршрутов
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить CORS для всех доменов
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Middleware обработки ошибок
app.use(errorMiddleware);

// Подключение к базе данных и запуск сервера
const PORT = process.env.PORT || 8080;
pool.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
    });
