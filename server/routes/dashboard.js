// routes/dashboard.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'caremed',
    password: 'root',
    port: 5432,
});

router.get('/statistics', async (req, res) => {
    try {
        // Получаем данные для панели управления
        // Здесь можно сделать запрос к базе данных для получения необходимых данных
        const dashboardData = {
            totalUsers: 100, // Ваше общее количество пользователей
            totalOrders: 50, // Ваше общее количество заказов и т.д.
            // Другие данные для панели управления
        };
        res.json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
