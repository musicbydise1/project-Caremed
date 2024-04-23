
const db = require("../models");
const Symptom = db.symptom;  // Убедитесь, что название модели соответствует определению

// Создание нового пациента
exports.create = (req, res) => {

    // Создание объекта пациента
    const symptom = {
        name: req.body.name,
        categoryId: req.body.categoryId,
    };

    // Сохранение пациента в базе данных
    Symptom.create(symptom)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Symptom."
            });
        });
};

// Получение всех пациентов из базы данных
exports.findAll = (req, res) => {
    Symptom.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving symptoms."
            });
        });
};

// Получение одного пациента по идентификатору
exports.findOne = (req, res) => {
    const id = req.params.id;

    Symptom.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Symptom with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Symptom with id=" + id
            });
        });
};

// Обновление данных пациента по идентификатору
exports.update = (req, res) => {
    const id = req.params.id;

    Symptom.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Symptom was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Symptom with id=${id}. Maybe Symptom was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient with id=" + id
            });
        });
};

// Удаление пациента по идентификатору
exports.delete = (req, res) => {
    const id = req.params.id;

    Symptom.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Symptom was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Symptom with id=${id}. Maybe Symptom was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Symptom with id=" + id
            });
        });
};
