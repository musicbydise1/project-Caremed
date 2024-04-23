
const db = require("../models");
const Category = db.analyscategory;  // Убедитесь, что название модели соответствует определению
const Indicator = db.analysindicator;

exports.findAllCategoriesWithSymptoms = (req, res) => {
    Category.findAll({
        include: [{
            model: Indicator,
            as: 'analisindicators'
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories with symptoms."
            });
        });
};

// Создание нового пациента
exports.create = (req, res) => {

    // Создание объекта пациента
    const category = {
        name: req.body.name,
        description: req.body.description,
    };

    // Сохранение пациента в базе данных
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
};

// Получение всех пациентов из базы данных
exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Patient was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Удаление пациента по идентификатору
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Category with id=${id}. Maybe Patient was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};
