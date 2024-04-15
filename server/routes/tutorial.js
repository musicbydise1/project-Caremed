const express = require('express');
const auth = require('../middlewares/auth');
const clientController = require('../controllers/tutorial');  // Изменен импорт
const { check } = require('express-validator');

const router = express.Router();

router.get('/', clientController.findAllClients);  // Изменен путь и контроллер

router.post(
    '/new',
    auth,
    [
        check('firstName', 'Please fill out the field').trim().notEmpty(),
        check('lastName', 'Please fill out the field').trim().notEmpty(),
        check('age', 'Please fill out the field').isNumeric(),
        check('email', 'Invalid email').isEmail(),
    ],
    clientController.createClient  // Изменен контроллер
);

router.get('/:id', clientController.findOneClient);  // Изменен путь и контроллер

router.post(
    '/edit/:id',
    auth,
    [
        check('firstName', 'Please fill out the field').trim().notEmpty(),
        check('lastName', 'Please fill out the field').trim().notEmpty(),
        check('age', 'Please fill out the field').isNumeric(),
        check('email', 'Invalid email').isEmail(),
    ],
    clientController.updateClient  // Изменен контроллер
);

router.post('/delete/:id', auth, clientController.deleteClient);  // Изменен путь и контроллер

module.exports = router;
