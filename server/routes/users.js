// routes/users.js

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

router.get('/index', async (req, res) => {
    try {
        // Получаем данные о пользователях
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
